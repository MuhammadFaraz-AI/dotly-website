import { NextResponse } from "next/server";
import { leadStore, newLeadId } from "@/lib/lead-store";
import {
  ALLOWED_ATTACHMENT_TYPES,
  MAX_ATTACHMENT_BYTES,
  leadSchema,
  type StoredLead,
} from "@/lib/leads";
import { rateLimit } from "@/lib/rate-limit";

export const runtime = "nodejs";

function clientIp(request: Request): string {
  return request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "unknown";
}

export async function POST(request: Request) {
  if (!rateLimit(`contact:${clientIp(request)}`, 5, 10 * 60 * 1000)) {
    return NextResponse.json({ error: "Too many requests. Please try again later." }, { status: 429 });
  }

  let form: FormData;
  try {
    form = await request.formData();
  } catch {
    return NextResponse.json({ error: "Invalid form data." }, { status: 400 });
  }

  // Honeypot: real visitors never fill this hidden field. Pretend success for bots.
  if (String(form.get("website") ?? "").length > 0) {
    return NextResponse.json({ ok: true });
  }

  const parsed = leadSchema.safeParse({
    name: form.get("name"),
    email: form.get("email"),
    company: form.get("company") ?? "",
    message: form.get("message"),
    needs: form.getAll("needs").map(String),
  });
  if (!parsed.success) {
    const first = parsed.error.issues[0]?.message ?? "Please check the form.";
    return NextResponse.json({ error: first }, { status: 422 });
  }

  const lead: StoredLead = {
    ...parsed.data,
    id: newLeadId(),
    createdAt: new Date().toISOString(),
    status: "new",
  };

  let attachment: { data: Buffer; storedAs: string } | undefined;
  const file = form.get("file");
  if (file instanceof File && file.size > 0) {
    if (file.size > MAX_ATTACHMENT_BYTES) {
      return NextResponse.json({ error: "The file is larger than 5 MB." }, { status: 413 });
    }
    if (!(ALLOWED_ATTACHMENT_TYPES as readonly string[]).includes(file.type)) {
      return NextResponse.json({ error: "That file type is not allowed." }, { status: 415 });
    }
    const storedAs = `${lead.id}.bin`;
    attachment = { data: Buffer.from(await file.arrayBuffer()), storedAs };
    lead.attachment = { name: file.name.slice(0, 120), storedAs, size: file.size, type: file.type };
  }

  try {
    await leadStore.save(lead, attachment);
  } catch (error) {
    console.error("Failed to save lead", error);
    return NextResponse.json({ error: "Could not save your message. Please email us instead." }, { status: 500 });
  }

  return NextResponse.json({ ok: true });
}
