import { z } from "zod";
import { needOptions } from "@/content/pages";

export const MAX_ATTACHMENT_BYTES = 5 * 1024 * 1024;
export const ALLOWED_ATTACHMENT_TYPES = [
  "application/pdf",
  "image/png",
  "image/jpeg",
  "text/plain",
  "application/zip",
] as const;

export const leadSchema = z.object({
  name: z.string().trim().min(2, "Please enter your name").max(100),
  email: z.string().trim().email("Please enter a valid email").max(200),
  company: z.string().trim().max(120).optional().default(""),
  message: z.string().trim().min(10, "Please tell us a little more").max(4000),
  needs: z.array(z.enum(needOptions)).max(needOptions.length).default([]),
});

export type LeadInput = z.infer<typeof leadSchema>;

export interface StoredLead extends LeadInput {
  id: string;
  createdAt: string;
  status: "new" | "replied" | "won";
  attachment?: { name: string; storedAs: string; size: number; type: string };
}

export type LeadStatus = "new" | "replied" | "won" | "lost";

/** Shape of a row in Supabase's `leads` table, as read/written by the admin dashboard. */
export interface LeadRow {
  id: string;
  created_at: string;
  name: string;
  email: string;
  company: string | null;
  message: string;
  needs: string[];
  status: LeadStatus;
  notes: string | null;
  attachment_path: string | null;
  attachment_name: string | null;
  attachment_size: number | null;
  attachment_type: string | null;
}
