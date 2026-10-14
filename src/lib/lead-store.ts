import { randomUUID } from "node:crypto";
import { appendFile, mkdir, writeFile } from "node:fs/promises";
import path from "node:path";
import { hasSupabaseSecretKey } from "@/lib/env";
import { createAdminClient } from "@/lib/supabase/admin";
import type { StoredLead } from "./leads";

const ATTACHMENT_BUCKET = "lead-attachments";

/**
 * Persistence boundary for leads. `fileLeadStore` writes JSON lines to disk, for local
 * development. `supabaseLeadStore` writes to the real `leads` table and is used whenever
 * SUPABASE_SECRET_KEY is configured (see `leadStore` below) — no other code needs to change.
 */
export interface LeadStore {
  save(lead: StoredLead, attachment?: { data: Buffer; storedAs: string }): Promise<void>;
}

const DATA_DIR = process.env.LEADS_DATA_DIR ?? path.join(process.cwd(), ".data");

export const fileLeadStore: LeadStore = {
  async save(lead, attachment) {
    await mkdir(path.join(DATA_DIR, "uploads"), { recursive: true });
    if (attachment) {
      await writeFile(path.join(DATA_DIR, "uploads", attachment.storedAs), attachment.data);
    }
    await appendFile(path.join(DATA_DIR, "leads.jsonl"), `${JSON.stringify(lead)}\n`, "utf8");
  },
};

/**
 * Uses the secret-key client: there is no public insert policy on `leads`, by design (RLS
 * only allows authenticated admins), so the contact form has to write server side with the
 * secret key rather than as an anonymous user.
 */
export const supabaseLeadStore: LeadStore = {
  async save(lead, attachment) {
    const admin = createAdminClient();
    let attachmentPath: string | null = null;

    if (attachment) {
      attachmentPath = `${lead.id}/${attachment.storedAs}`;
      const { error: uploadError } = await admin.storage.from(ATTACHMENT_BUCKET).upload(attachmentPath, attachment.data, {
        contentType: lead.attachment?.type,
        upsert: false,
      });
      if (uploadError) throw uploadError;
    }

    const { error: insertError } = await admin.from("leads").insert({
      id: lead.id,
      created_at: lead.createdAt,
      name: lead.name,
      email: lead.email,
      company: lead.company || null,
      message: lead.message,
      needs: lead.needs,
      status: "new",
      attachment_path: attachmentPath,
      attachment_name: lead.attachment?.name ?? null,
      attachment_size: lead.attachment?.size ?? null,
      attachment_type: lead.attachment?.type ?? null,
    });

    if (insertError) {
      // Don't leave an orphaned file behind if the row never made it in.
      if (attachmentPath) {
        await admin.storage.from(ATTACHMENT_BUCKET).remove([attachmentPath]).catch(() => {});
      }
      throw insertError;
    }
  },
};

export const leadStore: LeadStore = hasSupabaseSecretKey() ? supabaseLeadStore : fileLeadStore;

export function newLeadId(): string {
  return randomUUID();
}
