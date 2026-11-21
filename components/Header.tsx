import SiteLink from "./SiteLink";
import { ArrowUp, ArrowUpRight, Menu, Moon, Sun, X } from "lucide-react";
import { nav, profile } from "../data/profile";
import Socials from "./Socials";

function isActive(pathname: string, href: string) {
  if (href === "/") return pathname === "/";
  return pathname.startsWith(href);
}

export default function Header({ pathname }: { pathname: string }) {
  return (
    <>
      <header className="header">
        <div className="container">
          <SiteLink href="/" className="logo" aria-label={`${profile.fullName}, home`}>
            <span className="logo-mark">AK</span>
            <span>
              Adnan Kavak
              <small>Prof. Dr. · Kocaeli University</small>
            </span>
          </SiteLink>

          <nav className="nav-desktop" aria-label="Main">
            {nav.map((item) => (
              <SiteLink
                key={item.href}
                href={item.href}
                className={isActive(pathname, item.href) ? "active" : ""}
                aria-current={pathname === item.href ? "page" : undefined}
              >
                {item.label}
              </SiteLink>
            ))}
          </nav>

          <div className="header-actions">
            <button
              className="icon-btn"
              data-theme-toggle
              aria-label="Switch to light theme"
              title="Toggle theme"
            >
              <span data-theme-icon="dark"><Sun /></span>
              <span data-theme-icon="light"><Moon /></span>
            </button>
            <SiteLink href="/contact/" className="btn btn-primary">
              Let&apos;s Talk <ArrowUpRight />
            </SiteLink>
            <button className="menu-btn" data-menu-open aria-expanded="false" aria-controls="drawer">
              MENU <Menu />
            </button>
          </div>
        </div>
      </header>

      <div className="drawer-backdrop" data-menu-close />
      <aside id="drawer" className="drawer" inert aria-hidden="true" aria-label="Menu">
        <div className="drawer-top">
          <SiteLink href="/" className="logo">
            <span className="logo-mark">AK</span>
            <span>Adnan Kavak</span>
          </SiteLink>
          <button className="icon-btn" data-menu-close aria-label="Close menu">
            <X />
          </button>
        </div>
        <nav aria-label="Mobile">
          {nav.map((item, i) => (
            <SiteLink
                key={item.href}
                href={item.href}
                className={isActive(pathname, item.href) ? "active" : ""}
                aria-current={pathname === item.href ? "page" : undefined}
              >
              {item.label}
              <span>0{i + 1}</span>
            </SiteLink>
          ))}
        </nav>
        <div className="drawer-contact">
          <h4>Get in touch</h4>
          <a href={`mailto:${profile.email}`}>{profile.email}</a>
          <a href={`tel:${profile.phone.replace(/\s/g, "")}`}>{profile.phone}</a>
          <div style={{ marginTop: 22 }}>
            <Socials />
          </div>
        </div>
      </aside>
      <BackToTop />
    </>
  );
}

function BackToTop() {
  return (
    <button
      className="icon-btn to-top"
      data-back-to-top
      aria-label="Back to top"
      tabIndex={-1}
    >
      <ArrowUp />
    </button>
  );
}
