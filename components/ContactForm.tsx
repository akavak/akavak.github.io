"use client";

import { useEffect, useState } from "react";
import { Send } from "lucide-react";
import { profile } from "@/data/profile";

const subjects = [
  "Research collaboration",
  "Prospective student",
  "Industry partnership",
  "Speaking / editorial invitation",
  "Other",
];

// GitHub Pages is static hosting, so the form composes an email instead of posting to a server.
// To collect messages without the visitor's mail client, point `action` at a form service
// (e.g. Formspree) and switch to a regular POST.
export default function ContactForm() {
  const [subject, setSubject] = useState(subjects[0]);

  useEffect(() => {
    const s = new URLSearchParams(window.location.search).get("subject");
    if (s && subjects.includes(s)) setSubject(s);
  }, []);

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const f = new FormData(e.currentTarget);
    const body = `${f.get("message")}\n\n— ${f.get("name")}${f.get("org") ? `, ${f.get("org")}` : ""}\n${f.get("email")}`;
    window.location.href = `mailto:${profile.email}?subject=${encodeURIComponent(`[Website] ${subject}`)}&body=${encodeURIComponent(body)}`;
  };

  return (
    <form className="form" onSubmit={onSubmit}>
      <div className="field">
        <label htmlFor="name">Full name</label>
        <input id="name" name="name" required autoComplete="name" />
      </div>
      <div className="field">
        <label htmlFor="email">Email</label>
        <input id="email" name="email" type="email" required autoComplete="email" />
      </div>
      <div className="field">
        <label htmlFor="org">Institution / company</label>
        <input id="org" name="org" autoComplete="organization" />
      </div>
      <div className="field">
        <label htmlFor="subject">Subject</label>
        <select id="subject" value={subject} onChange={(e) => setSubject(e.target.value)}>
          {subjects.map((s) => (
            <option key={s}>{s}</option>
          ))}
        </select>
      </div>
      <div className="field full">
        <label htmlFor="message">Message</label>
        <textarea id="message" name="message" required />
      </div>
      <div className="full" style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: 16, flexWrap: "wrap" }}>
        <p className="form-note">Your message is not stored on this website.</p>
        <button className="btn btn-primary" type="submit">
          Send Message <Send />
        </button>
      </div>
    </form>
  );
}
