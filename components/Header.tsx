"use client";

import SiteLink from "@/components/SiteLink";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { ArrowUp, ArrowUpRight, Menu, Moon, Sun, X } from "lucide-react";
import { nav, profile } from "@/data/profile";
import Socials from "./Socials";

function isActive(pathname: string, href: string) {
  if (href === "/") return pathname === "/";
  return pathname.startsWith(href.replace(/\/$/, ""));
}

export default function Header() {
  const pathname = usePathname() || "/";
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [theme, setTheme] = useState<"dark" | "light">("dark");

  useEffect(() => {
    const current = document.documentElement.getAttribute("data-theme");
    setTheme(current === "light" ? "light" : "dark");
    const onScroll = () => setScrolled(window.scrollY > 30);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => setOpen(false), [pathname]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  const toggleTheme = () => {
    const next = theme === "dark" ? "light" : "dark";
    setTheme(next);
    document.documentElement.setAttribute("data-theme", next);
    try {
      localStorage.setItem("theme", next);
    } catch {
      /* storage unavailable */
    }
  };

  return (
    <>
      <header className={`header${scrolled ? " scrolled" : ""}`}>
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
              <SiteLink key={item.href} href={item.href} className={isActive(pathname, item.href) ? "active" : ""}>
                {item.label}
              </SiteLink>
            ))}
          </nav>

          <div className="header-actions">
            <button
              className="icon-btn"
              onClick={toggleTheme}
              aria-label={theme === "dark" ? "Switch to light theme" : "Switch to dark theme"}
              title="Toggle theme"
            >
              {theme === "dark" ? <Sun /> : <Moon />}
            </button>
            <SiteLink href="/contact/" className="btn btn-primary">
              Let&apos;s Talk <ArrowUpRight />
            </SiteLink>
            <button className="menu-btn" onClick={() => setOpen(true)} aria-expanded={open} aria-controls="drawer">
              MENU <Menu />
            </button>
          </div>
        </div>
      </header>

      <div className={`drawer-backdrop${open ? " open" : ""}`} onClick={() => setOpen(false)} />
      <aside id="drawer" className={`drawer${open ? " open" : ""}`} aria-hidden={!open} aria-label="Menu">
        <div className="drawer-top">
          <SiteLink href="/" className="logo">
            <span className="logo-mark">AK</span>
            <span>Adnan Kavak</span>
          </SiteLink>
          <button className="icon-btn" onClick={() => setOpen(false)} aria-label="Close menu">
            <X />
          </button>
        </div>
        <nav aria-label="Mobile">
          {nav.map((item, i) => (
            <SiteLink key={item.href} href={item.href} className={isActive(pathname, item.href) ? "active" : ""} tabIndex={open ? 0 : -1}>
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
      <BackToTop show={scrolled} />
    </>
  );
}

function BackToTop({ show }: { show: boolean }) {
  return (
    <button
      className={`icon-btn to-top${show ? " show" : ""}`}
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      aria-label="Back to top"
      tabIndex={show ? 0 : -1}
    >
      <ArrowUp />
    </button>
  );
}
