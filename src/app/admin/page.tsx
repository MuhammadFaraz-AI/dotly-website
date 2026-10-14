import "@/styles/admin.css";
import type { Metadata } from "next";
import { AdminApp } from "@/components/admin/AdminApp";
import { requireAdmin } from "@/lib/admin-auth";
import { createClient } from "@/lib/supabase/server";
import type { LeadRow } from "@/lib/leads";

export const metadata: Metadata = {
  title: "Admin",
  robots: { index: false, follow: false },
};

export default async function AdminPage() {
  await requireAdmin();

  const supabase = await createClient();
  const { data, error } = await supabase.from("leads").select("*").order("created_at", { ascending: false });
  if (error) console.error("Failed to load leads", error);

  const leads: LeadRow[] = data ?? [];

  return <AdminApp leads={leads} />;
}
