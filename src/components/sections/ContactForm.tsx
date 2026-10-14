"use client";

import { useRouter } from "next/navigation";
import { useState, type FormEvent } from "react";
import { needOptions } from "@/content/pages";

export function ContactForm() {
  const router = useRouter();
  const [picks, setPicks] = useState<string[]>([needOptions[0]]);
  const [error, setError] = useState<string | null>(null);
  const [sending, setSending] = useState(false);

  const toggle = (option: string) =>
    setPicks((prev) => (prev.includes(option) ? prev.filter((p) => p !== option) : [...prev, option]));

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(null);
    setSending(true);
    const data = new FormData(event.currentTarget);
    picks.forEach((p) => data.append("needs", p));
    try {
      const res = await fetch("/api/contact", { method: "POST", body: data });
      const body = (await res.json().catch(() => ({}))) as { error?: string };
      if (!res.ok) {
        setError(body.error ?? "Something went wrong. Please try again.");
        return;
      }
      router.push("/thank-you");
    } catch {
      setError("Network error. Please check your connection and try again.");
    } finally {
      setSending(false);
    }
  }

  return (
    <form className="dt-form" onSubmit={onSubmit} noValidate={false}>
      <h3 className="h3">Tell us about your project</h3>
      <div className="dt-field">
        <span className="small" id="lbl-need">What do you need?</span>
        <div className="picks" role="group" aria-labelledby="lbl-need">
          {needOptions.map((o) => (
            <button type="button" className="dt-chip pick" key={o} aria-pressed={picks.includes(o)} onClick={() => toggle(o)}>
              {o}
            </button>
          ))}
        </div>
      </div>
      <div className="dt-field">
        <label htmlFor="cn">Your name</label>
        <input id="cn" name="name" placeholder="Your full name" required minLength={2} maxLength={100} autoComplete="name" />
      </div>
      <div className="dt-field">
        <label htmlFor="ce">Your email</label>
        <input id="ce" name="email" type="email" placeholder="you@company.com" required maxLength={200} autoComplete="email" />
      </div>
      <div className="dt-field">
        <label htmlFor="cp">Company or brand</label>
        <input id="cp" name="company" placeholder="Your company or brand" maxLength={120} autoComplete="organization" />
      </div>
      <div className="dt-field">
        <label htmlFor="cm">What would you like to automate?</label>
        <textarea id="cm" name="message" placeholder="What slows your team down?" required minLength={10} maxLength={4000} />
      </div>
      <div className="dt-field">
        <label htmlFor="cf">Attach a file (optional)</label>
        <input id="cf" name="file" type="file" accept=".pdf,.png,.jpg,.jpeg,.txt,.zip" />
      </div>
      {/* Honeypot field, hidden from people and assistive tech. */}
      <div aria-hidden="true" style={{ position: "absolute", left: "-9999px", height: 0, overflow: "hidden" }}>
        <label htmlFor="cw">Website</label>
        <input id="cw" name="website" tabIndex={-1} autoComplete="off" />
      </div>
      {error && (
        <p role="alert" style={{ color: "#b52a05", margin: 0, fontWeight: 500 }}>
          {error}
        </p>
      )}
      <button className="dt-btn dt-btn--primary" type="submit" disabled={sending}>
        {sending ? "Sending..." : "Send message"}
      </button>
    </form>
  );
}
