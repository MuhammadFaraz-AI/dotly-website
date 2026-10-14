"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { Icon, type IconName } from "@/components/ui/Icon";
import { signOut } from "@/app/admin/login/actions";
import { getAttachmentUrl, updateLeadNotes, updateLeadStatus } from "@/app/admin/leads-actions";
import type { LeadRow } from "@/lib/leads";
import {
  samplePages,
  samplePosts,
  sampleServices,
  sampleWorks,
  weekVisits,
  type ContentItem,
} from "./data";

type View = "overview" | "leads" | "content" | "settings";

const views: { id: View; label: string; icon: IconName }[] = [
  { id: "overview", label: "Overview", icon: "layout-dashboard" },
  { id: "leads", label: "Leads", icon: "inbox" },
  { id: "content", label: "Content", icon: "file-text" },
  { id: "settings", label: "Settings", icon: "settings" },
];

const LEAD_STATUSES: LeadRow["status"][] = ["new", "replied", "won", "lost"];
const STATUS_LABEL: Record<LeadRow["status"], string> = { new: "New", replied: "Replied", won: "Won", lost: "Lost" };

function StatCard({ icon, label, value, note }: { icon: IconName; label: string; value: string; note: string }) {
  return (
    <article className="a-card a-stat">
      <span className="dt-tile"><Icon name={icon} size={20} /></span>
      <div className="a-col">
        <span className="small dt-muted">{label}</span>
        <strong className="a-num">{value}</strong>
        <span className="small dt-muted">{note}</span>
      </div>
    </article>
  );
}

function LeadRows({
  leads,
  onAdvance,
  expandedId,
  onToggleExpand,
  notesDraft,
  onNotesChange,
  onSaveNotes,
  savingNotesId,
  onViewAttachment,
  attachmentError,
}: {
  leads: LeadRow[];
  onAdvance: (lead: LeadRow) => void;
  expandedId: string | null;
  onToggleExpand: (id: string) => void;
  notesDraft: Record<string, string>;
  onNotesChange: (id: string, value: string) => void;
  onSaveNotes: (id: string) => void;
  savingNotesId: string | null;
  onViewAttachment: (lead: LeadRow) => void;
  attachmentError: string | null;
}) {
  return (
    <div className="a-table">
      <div className="a-row a-th">
        <span>Contact</span>
        <span className="hide-m">Interested in</span>
        <span>Status</span>
        <span />
      </div>
      {leads.map((l) => (
        <div key={l.id}>
          <div className="a-row">
            <div className="a-who"><b>{l.name}</b><span>{l.email}</span></div>
            <span className="hide-m">{l.needs.join(", ") || "—"}</span>
            <span className={`a-pill ${l.status}`}>{STATUS_LABEL[l.status]}</span>
            <div className="a-act">
              <button type="button" className="a-mini" aria-label={`View details for ${l.name}`} onClick={() => onToggleExpand(l.id)}>
                <Icon name="pencil" size={16} />
              </button>
              <button type="button" className="a-mini" aria-label={`Move ${l.name} to the next stage`} onClick={() => onAdvance(l)}>
                <Icon name="eye" size={16} />
              </button>
            </div>
          </div>
          {expandedId === l.id && (
            <div style={{ display: "grid", gap: 12, padding: "0 0 20px" }}>
              {l.company && <p className="small dt-muted" style={{ margin: 0 }}>{l.company}</p>}
              <p className="dt-muted" style={{ margin: 0 }}>{l.message}</p>
              {l.attachment_name && (
                <div>
                  <button type="button" className="dt-btn dt-btn--secondary" onClick={() => onViewAttachment(l)}>
                    <Icon name="file-text" size={16} /> View attachment ({l.attachment_name})
                  </button>
                  {attachmentError && (
                    <p className="small" style={{ color: "#b52a05", margin: "8px 0 0" }}>{attachmentError}</p>
                  )}
                </div>
              )}
              <div className="dt-field">
                <label htmlFor={`notes-${l.id}`}>Notes</label>
                <textarea
                  id={`notes-${l.id}`}
                  value={notesDraft[l.id] ?? l.notes ?? ""}
                  onChange={(e) => onNotesChange(l.id, e.target.value)}
                />
              </div>
              <button
                type="button"
                className="dt-btn dt-btn--primary"
                style={{ justifySelf: "start" }}
                disabled={savingNotesId === l.id}
                onClick={() => onSaveNotes(l.id)}
              >
                {savingNotesId === l.id ? "Saving..." : "Save notes"}
              </button>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

function ContentGroup({
  title, items, onFlip, action,
}: {
  title: string;
  items: ContentItem[];
  onFlip: (id: string) => void;
  action?: string;
}) {
  return (
    <section className="a-card">
      <div className="a-head">
        <h2>{title}</h2>
        {action && (
          <button type="button" className="dt-btn dt-btn--secondary">
            <Icon name="plus" size={16} /> {action}
          </button>
        )}
      </div>
      {items.map((c) => (
        <div className="a-item" key={c.id}>
          <div className="a-who"><b>{c.title}</b><span>{c.meta}</span></div>
          <span className={`a-pill ${c.live ? "live" : "draft"}`}>{c.live ? "Live" : "Draft"}</span>
          <button type="button" className="a-sw" role="switch" aria-checked={c.live} aria-label={`Published: ${c.title}`} onClick={() => onFlip(c.id)}>
            <i />
          </button>
          <button type="button" className="a-mini" aria-label={`Edit ${c.title}`}>
            <Icon name="pencil" size={16} />
          </button>
        </div>
      ))}
    </section>
  );
}

const activity: { icon: IconName; text: string; when: string }[] = [
  { icon: "mail", text: "New inquiry from [Name]", when: "Just now" },
  { icon: "pencil", text: "Blog post edited", when: "2 hours ago" },
  { icon: "eye", text: "Works page published", when: "Yesterday" },
  { icon: "settings", text: "Contact details updated", when: "2 days ago" },
];

export function AdminApp({ leads: initialLeads }: { leads: LeadRow[] }) {
  const [view, setView] = useState<View>("overview");
  const [filter, setFilter] = useState<"All" | LeadRow["status"]>("All");
  const [leads, setLeads] = useState(initialLeads);
  const [pages, setPages] = useState(samplePages);
  const [posts, setPosts] = useState(samplePosts);
  const [services, setServices] = useState(sampleServices);
  const [works, setWorks] = useState(sampleWorks);
  const [saved, setSaved] = useState(false);

  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [notesDraft, setNotesDraft] = useState<Record<string, string>>({});
  const [savingNotesId, setSavingNotesId] = useState<string | null>(null);
  const [attachmentError, setAttachmentError] = useState<string | null>(null);

  const flip = (setter: typeof setPages) => (id: string) =>
    setter((items) => items.map((i) => (i.id === id ? { ...i, live: !i.live } : i)));

  const advance = async (lead: LeadRow) => {
    const next = LEAD_STATUSES[(LEAD_STATUSES.indexOf(lead.status) + 1) % LEAD_STATUSES.length];
    setLeads((items) => items.map((l) => (l.id === lead.id ? { ...l, status: next } : l)));
    const result = await updateLeadStatus(lead.id, next);
    if (result.error) {
      setLeads((items) => items.map((l) => (l.id === lead.id ? { ...l, status: lead.status } : l)));
    }
  };

  const toggleExpand = (id: string) => {
    setAttachmentError(null);
    setExpandedId((current) => (current === id ? null : id));
  };

  const saveNotes = async (id: string) => {
    const notes = notesDraft[id];
    if (notes === undefined) return;
    setSavingNotesId(id);
    const result = await updateLeadNotes(id, notes);
    if (!result.error) {
      setLeads((items) => items.map((l) => (l.id === id ? { ...l, notes } : l)));
    }
    setSavingNotesId(null);
  };

  const viewAttachment = async (lead: LeadRow) => {
    setAttachmentError(null);
    if (!lead.attachment_path) return;
    const result = await getAttachmentUrl(lead.attachment_path);
    if (result.url) {
      window.open(result.url, "_blank", "noopener,noreferrer");
    } else {
      setAttachmentError(result.error ?? "Could not open this file.");
    }
  };

  const go = (v: View) => {
    setView(v);
    setSaved(false);
  };

  const newCount = leads.filter((l) => l.status === "new").length;
  const repliedCount = leads.filter((l) => l.status === "replied").length;
  const wonCount = leads.filter((l) => l.status === "won").length;
  const title = views.find((v) => v.id === view)?.label ?? "";
  const filtered = leads.filter((l) => filter === "All" || l.status === filter);
  const publishedPages = pages.filter((p) => p.live).length;
  const peak = Math.max(...weekVisits.map((d) => d.value));

  return (
    <div className="dt adm">
      <aside className="a-side" aria-label="Admin">
        <div className="a-brand">
          <Image src="/logo.png" alt="Dotly" width={40} height={40} />
          <span>Dotly</span>
          <span className="a-badge">ADMIN</span>
        </div>
        {views.map((v) => (
          <button type="button" className="a-link" key={v.id} aria-current={view === v.id ? "page" : undefined} onClick={() => go(v.id)}>
            <Icon name={v.icon} size={20} />
            <span className="t">{v.label}</span>
            {v.id === "leads" && newCount > 0 && <span className="a-count">{newCount}</span>}
          </button>
        ))}
        <div className="a-spacer" />
        <Link className="a-link" href="/" style={{ textDecoration: "none" }}>
          <Icon name="globe" size={20} />
          <span className="t">View site</span>
        </Link>
        <button type="button" className="a-link" onClick={() => signOut()}>
          <Icon name="log-out" size={20} />
          <span className="t">Log out</span>
        </button>
      </aside>

      <main className="a-main">
        <header className="a-top">
          <h1>{title}</h1>
          <div className="a-grow" />
          <label className="a-search">
            <Icon name="search" size={18} />
            <input placeholder="Search leads, pages, posts" aria-label="Search" />
          </label>
          <button type="button" className="a-icon-btn" aria-label="Notifications">
            <Icon name="bell" size={20} />
            <span className="a-dot" />
          </button>
          <div className="a-me"><span className="a-av">MF</span><span>Muhammad Faraz</span></div>
        </header>

        {view === "overview" && (
          <>
            <div className="a-stats">
              <StatCard icon="inbox" label="New leads" value={String(newCount)} note="Right now" />
              <StatCard icon="message-square" label="Replied" value={String(repliedCount)} note="Right now" />
              <StatCard icon="badge-check" label="Won" value={String(wonCount)} note="Right now" />
              <StatCard icon="file-text" label="Published pages" value={String(publishedPages)} note={`Of ${pages.length} pages`} />
            </div>
            <div className="a-grid2">
              <section className="a-card">
                <div className="a-head">
                  <h2>Recent leads</h2>
                  <button type="button" className="dt-btn dt-btn--secondary" onClick={() => go("leads")}>View all</button>
                </div>
                <LeadRows
                  leads={leads.slice(0, 4)}
                  onAdvance={advance}
                  expandedId={expandedId}
                  onToggleExpand={toggleExpand}
                  notesDraft={notesDraft}
                  onNotesChange={(id, value) => setNotesDraft((d) => ({ ...d, [id]: value }))}
                  onSaveNotes={saveNotes}
                  savingNotesId={savingNotesId}
                  onViewAttachment={viewAttachment}
                  attachmentError={attachmentError}
                />
              </section>
              <div style={{ display: "grid", gap: 24, minWidth: 0 }}>
                <section className="a-card">
                  <div className="a-head"><h2>Visits, last 7 days</h2></div>
                  <div className="a-bars">
                    {weekVisits.map((d) => (
                      <div className="a-bar" key={d.day}>
                        <i className={d.value === peak ? "hot" : ""} style={{ height: `${d.value}%` }} />
                        <span>{d.day}</span>
                      </div>
                    ))}
                  </div>
                  <p className="small dt-muted" style={{ margin: "12px 0 0" }}>
                    Placeholder data. Connect analytics to show real numbers.
                  </p>
                </section>
                <section className="a-card">
                  <div className="a-head"><h2>Activity</h2></div>
                  <ul className="a-list">
                    {activity.map((a) => (
                      <li key={a.text}>
                        <span className="dt-tile"><Icon name={a.icon} size={18} /></span>
                        <div><p>{a.text}</p><small>{a.when}</small></div>
                      </li>
                    ))}
                  </ul>
                </section>
              </div>
            </div>
          </>
        )}

        {view === "leads" && (
          <section className="a-card">
            <div className="a-head">
              <h2>Inquiries from the contact form</h2>
              <div className="a-filters">
                {(["All", ...LEAD_STATUSES] as const).map((f) => (
                  <button type="button" className="dt-chip a-f" key={f} aria-pressed={filter === f} onClick={() => setFilter(f)}>
                    {f === "All" ? "All" : STATUS_LABEL[f]}
                  </button>
                ))}
              </div>
            </div>
            <LeadRows
              leads={filtered}
              onAdvance={advance}
              expandedId={expandedId}
              onToggleExpand={toggleExpand}
              notesDraft={notesDraft}
              onNotesChange={(id, value) => setNotesDraft((d) => ({ ...d, [id]: value }))}
              onSaveNotes={saveNotes}
              savingNotesId={savingNotesId}
              onViewAttachment={viewAttachment}
              attachmentError={attachmentError}
            />
            <p className="small dt-muted" style={{ margin: "16px 0 0" }}>
              Tap the pencil for details and notes, or the eye to move a lead to the next stage: New, Replied, Won, Lost.
            </p>
          </section>
        )}

        {view === "content" && (
          <div className="a-cgrid">
            <ContentGroup title="Pages" items={pages} onFlip={flip(setPages)} />
            <ContentGroup title="Blog posts" items={posts} onFlip={flip(setPosts)} action="New post" />
            <ContentGroup title="Services" items={services} onFlip={flip(setServices)} />
            <ContentGroup title="Works" items={works} onFlip={flip(setWorks)} action="New case study" />
          </div>
        )}

        {view === "settings" && (
          <>
            <div className="a-grid2">
              <section className="a-card">
                <div className="a-head"><h2>Site details</h2></div>
                <form className="a-set" onSubmit={(e) => e.preventDefault()}>
                  <div className="dt-field"><label htmlFor="s1">Site name</label><input id="s1" placeholder="Dotly" /></div>
                  <div className="dt-field full"><label htmlFor="s2">Tagline</label><input id="s2" placeholder="AI automation studio" /></div>
                  <div className="dt-field"><label htmlFor="s3">Contact email</label><input id="s3" placeholder="[hello@yourdomain]" /></div>
                  <div className="dt-field"><label htmlFor="s4">Phone or WhatsApp</label><input id="s4" placeholder="[number]" /></div>
                  <div className="dt-field"><label htmlFor="s5">LinkedIn link</label><input id="s5" placeholder="https://linkedin.com/in/[name]" /></div>
                  <div className="dt-field"><label htmlFor="s6">Upwork link</label><input id="s6" placeholder="https://upwork.com/freelancers/[name]" /></div>
                  <div className="dt-field full"><label htmlFor="s7">Footer text</label><input id="s7" placeholder="Dotly, AI automation studio" /></div>
                </form>
              </section>
              <div style={{ display: "grid", gap: 24, minWidth: 0 }}>
                <section className="a-card">
                  <div className="a-head"><h2>Search and sharing</h2></div>
                  <form className="a-set" onSubmit={(e) => e.preventDefault()}>
                    <div className="dt-field full"><label htmlFor="s8">Home page title</label><input id="s8" placeholder="Dotly | AI Automation and AI Agents Studio" /></div>
                    <div className="dt-field full"><label htmlFor="s9">Meta description</label><textarea id="s9" placeholder="One sentence that appears in search results." /></div>
                  </form>
                </section>
                <section className="a-card">
                  <div className="a-head"><h2>Admin access</h2></div>
                  <div className="a-note">
                    <Icon name="shield-check" size={20} />
                    <span>Only signed in admins can open this dashboard. Visitors never see this page.</span>
                  </div>
                </section>
              </div>
            </div>
            <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
              <button type="button" className="dt-btn dt-btn--primary" onClick={() => setSaved(true)}>Save changes</button>
            </div>
          </>
        )}

        {saved && (
          <div className="a-toast" role="status">
            <Icon name="eye" size={16} /> Changes saved (preview only)
          </div>
        )}
      </main>
    </div>
  );
}
