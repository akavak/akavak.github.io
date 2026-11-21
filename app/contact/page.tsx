import type { Metadata } from "next";
import { Building2, Mail, MapPin, Phone } from "lucide-react";
import PageHero from "@/components/PageHero";
import Reveal from "@/components/Reveal";
import Socials from "@/components/Socials";
import ContactForm from "@/components/ContactForm";
import { profile } from "@/data/profile";

export const metadata: Metadata = {
  title: "Contact",
  description: "Contact Prof. Dr. Adnan Kavak at Kocaeli University for research collaboration, graduate supervision and speaking invitations.",
};

export default function ContactPage() {
  const items = [
    { Icon: Mail, label: "Email", value: profile.email, href: `mailto:${profile.email}` },
    { Icon: Mail, label: "Alternative email", value: profile.emailAlt, href: `mailto:${profile.emailAlt}` },
    { Icon: Phone, label: "Office phone", value: profile.phone, href: `tel:${profile.phone.replace(/\s/g, "")}` },
    { Icon: Building2, label: "Department", value: `${profile.department}, ${profile.affiliation}` },
    { Icon: MapPin, label: "Office", value: profile.office },
  ];
  return (
    <>
      <PageHero
        crumb="Contact"
        eyebrow="Get in Touch"
        title={
          <>
            Let&apos;s <span className="serif accent">talk</span>
          </>
        }
        intro="Research collaborations, graduate admissions, industry partnerships, review and speaking invitations are all welcome."
      />
      <section className="section">
        <div className="container contact-grid">
          <Reveal>
            <h2 style={{ fontSize: 32 }}>Contact details</h2>
            <p>The fastest way to reach me is by email. Please include a short description of your enquiry.</p>
            <div style={{ marginTop: 28 }}>
              {items.map(({ Icon, label, value, href }) => (
                <div className="contact-item" key={label}>
                  <span className="ic">
                    <Icon />
                  </span>
                  <div>
                    <h4>{label}</h4>
                    {href ? <a href={href}>{value}</a> : <span>{value}</span>}
                  </div>
                </div>
              ))}
            </div>
            <div style={{ marginTop: 32 }}>
              <Socials />
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <div className="panel">
              <h2 style={{ fontSize: 32 }}>Send a message</h2>
              <p style={{ marginBottom: 28 }}>This form opens your email client with the message pre-filled.</p>
              <ContactForm />
            </div>
          </Reveal>
        </div>
      </section>
      <section style={{ paddingBottom: 120 }}>
        <div className="container">
          <Reveal>
            <div className="panel" style={{ padding: 0, overflow: "hidden" }}>
              <iframe
                title="Map of Kocaeli University Faculty of Engineering"
                src="https://www.openstreetmap.org/export/embed.html?bbox=29.9100%2C40.8100%2C29.9450%2C40.8320&amp;layer=mapnik&amp;marker=40.8215%2C29.9265"
                style={{ border: 0, width: "100%", height: 380, display: "block", filter: "grayscale(0.4)" }}
                loading="lazy"
              />
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
