import SiteLink from "@/components/SiteLink";
import { nav, profile } from "@/data/profile";
import Socials from "./Socials";
import { asset } from "@/lib/site";

export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-grid">
          <div>
            <SiteLink href="/" className="logo">
              <span className="logo-mark">AK</span>
              <span>
                Adnan Kavak
                <small>Prof. Dr. · Kocaeli University</small>
              </span>
            </SiteLink>
            <p className="about-blurb">
              Professor of Computer Engineering and Head of the WINS Research Center, working on wireless networks, 6G and
              trustworthy AI for digital health.
            </p>
            <Socials withEmail />
          </div>
          <div>
            <h4>Explore</h4>
            <ul>
              {nav.slice(0, 5).map((n) => (
                <li key={n.href}>
                  <SiteLink href={n.href}>{n.label}</SiteLink>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4>More</h4>
            <ul>
              {nav.slice(5).map((n) => (
                <li key={n.href}>
                  <SiteLink href={n.href}>{n.label}</SiteLink>
                </li>
              ))}
              <li>
                <a href={asset(profile.cv)} target="_blank" rel="noopener">
                  Download CV
                </a>
              </li>
              <li>
                <a href={profile.links.wins} target="_blank" rel="noopener noreferrer">
                  WINS Research Center
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h4>Contact</h4>
            <a className="mail" href={`mailto:${profile.email}`}>
              {profile.email}
            </a>
            <p style={{ marginTop: 16, fontSize: 15 }}>
              {profile.department}
              <br />
              {profile.affiliation}, {profile.location}
            </p>
          </div>
        </div>
      </div>
      <div className="footer-big" aria-hidden="true">
        ADNAN KAVAK
      </div>
      <div className="container">
        <div className="footer-bottom">
          <span>
            © {year} {profile.fullName}. All rights reserved.
          </span>
          <span>Kocaeli University · Department of Computer Engineering</span>
        </div>
      </div>
    </footer>
  );
}
