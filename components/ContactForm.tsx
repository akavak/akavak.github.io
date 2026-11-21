import { Send } from "lucide-react";
import { profile } from "../data/profile";

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
  return (
    <form className="form" action={`mailto:${profile.email}`} method="post" encType="text/plain" data-contact-form>
      <div className="field">
        <label htmlFor="name">Full name</label>
        <input className="form-control" id="name" name="name" required autoComplete="name" />
      </div>
      <div className="field">
        <label htmlFor="email">Email</label>
        <input className="form-control" id="email" name="email" type="email" required autoComplete="email" />
      </div>
      <div className="field">
        <label htmlFor="org">Institution / company</label>
        <input className="form-control" id="org" name="org" autoComplete="organization" />
      </div>
      <div className="field">
        <label htmlFor="subject">Subject</label>
        <select id="subject" name="subject" className="form-select">
          {subjects.map((s) => (
            <option key={s}>{s}</option>
          ))}
        </select>
      </div>
      <div className="field full">
        <label htmlFor="message">Message</label>
        <textarea className="form-control" id="message" name="message" required />
      </div>
      <div className="full d-flex justify-content-between align-items-center gap-3 flex-wrap">
        <p className="form-note">Your message is not stored on this website.</p>
        <button className="btn btn-primary" type="submit">
          Send Message <Send />
        </button>
      </div>
    </form>
  );
}
