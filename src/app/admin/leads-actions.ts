"use server";

import { revalidatePath } from "next/cache";
import { getAdminSession } from "@/lib/admin-auth";
import { createClient } from "@/lib/supabase/server";
import { createAdminClient } from "@/lib/supabase/admin";
import type { LeadStatus } from "@/lib/leads";

/**
 * Every action here re-checks admin_users itself (the proxy only proves "signed in"), and
 * then updates through the signed-in client so the leads RLS policy is the second, independent
 * layer of enforcement.
 */

export async function updateLeadStatus(id: string, status: LeadStatus): Promise<{ error?: string }> {
  const session = await getAdminSession();
  if (!session) return { error: "Unauthorized." };

  const supabase = await createClient();
  const { error } = await supabase.from("leads").update({ status }).eq("id", id);
  if (error) return { error: "Could not update the lead." };

  revalidatePath("/admin");
  return {};
}

export async function updateLeadNotes(id: string, notes: string): Promise<{ error?: string }> {
  const session = await getAdminSession();
  if (!session) return { error: "Unauthorized." };

  const supabase = await createClient();
  const { error } = await supabase.from("leads").update({ notes }).eq("id", id);
  if (error) return { error: "Could not save the notes." };

  revalidatePath("/admin");
  return {};
}

export async function getAttachmentUrl(path: string): Promise<{ url?: string; error?: string }> {
  const session = await getAdminSession();
  if (!session) return { error: "Unauthorized." };

  const admin = createAdminClient();
  const { data, error } = await admin.storage.from("lead-attachments").createSignedUrl(path, 60);
  if (error || !data) return { error: "Could not create a link for this file." };

  return { url: data.signedUrl };
}
