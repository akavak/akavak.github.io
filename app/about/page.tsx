import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight, Briefcase, Building2, Download, GraduationCap, Languages, PenTool } from "lucide-react";
import PageHero from "@/components/PageHero";
import Reveal from "@/components/Reveal";
import Socials from "@/components/Socials";
import { asset } from "@/lib/site";
import {
  academicPositions,
  adminRoles,
  citationTable,
  education,
  industryExperience,
  languages,
  profile,
  service,
} from "@/data/profile";

export const metadata: Metadata = {
  title: "About",
  description: "Biography, education, academic positions, industry experience and professional service of Prof. Dr. Adnan Kavak.",
};

function Timeline({ items }: { items: { period: string; title: string; org: string; detail?: string }[] }) {
  return (
    <div className="timeline">
      {items.map((e) => (
        <div className="tl-item" key={e.period + e.title + e.org}>
          <span className="tl-period">{e.period}</span>
          <h4>{e.title}</h4>
          <div className="org">{e.org}</div>
          {e.detail && <p>{e.detail}</p>}
        </div>
      ))}
    </div>
  );
}

export default function AboutPage() {
  return (
    <>
      <PageHero
        crumb="About"
        eyebrow="Biography"
        title={
          <>
            About <span className="serif accent">me</span>
          </>
        }
        intro="Professor, research center leader and lifelong student of how signals, networks and people interact."
      />

      <section className="section">
        <div className="container about-grid" style={{ alignItems: "start" }}>
          <Reveal>
            <div className="hero-photo" style={{ justifySelf: "start", maxWidth: 400 }}>
              <div className="frame">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={asset(profile.photo)} alt={`Portrait of ${profile.fullName}`} width={400} height={500} />
              </div>
            </div>
            <div className="panel" style={{ marginTop: 28, maxWidth: 400 }}>
              <h3 style={{ fontSize: 22 }}>{profile.fullName}</h3>
              <p style={{ marginBottom: 18 }}>
                {profile.role}
                <br />
                {profile.affiliation}
              </p>
              <table className="citation-table" aria-label="Researcher identifiers">
                <tbody>
                  <tr>
                    <td style={{ color: "var(--text-3)" }}>ORCID</td>
                    <td>
                      <a href={profile.links.orcid} target="_blank" rel="noopener noreferrer">
                        {profile.ids.orcid}
                      </a>
                    </td>
                  </tr>
                  <tr>
                    <td style={{ color: "var(--text-3)" }}>YÖKSİS ID</td>
                    <td>
                      <a href={profile.links.yok} target="_blank" rel="noopener noreferrer">
                        {profile.ids.yoksis}
                      </a>
                    </td>
                  </tr>
                  <tr>
                    <td style={{ color: "var(--text-3)" }}>Office</td>
                    <td style={{ fontSize: 14 }}>Faculty of Engineering, Block B</td>
                  </tr>
                </tbody>
              </table>
              <div style={{ marginTop: 22 }}>
                <Socials withEmail />
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <span className="eyebrow">Who I Am</span>
            <h2 className="h2" style={{ marginBottom: 28 }}>
              Three decades at the frontier of <span className="serif accent">wireless</span> and{" "}
              <span className="serif accent">intelligent</span> systems.
            </h2>
            {profile.bio.map((para, i) => (
              <p key={i} className={i === 0 ? "lead" : undefined} style={i === 0 ? { fontSize: 20 } : undefined}>
                {para}
              </p>
            ))}
            <div className="hero-cta" style={{ marginTop: 32 }}>
              <a href={asset(profile.cv)} className="btn btn-primary" target="_blank" rel="noopener">
                Download Full CV <Download />
              </a>
              <Link href="/contact/" className="btn btn-outline">
                Contact <ArrowUpRight />
              </Link>
            </div>

            <div className="panel" style={{ marginTop: 40 }}>
              <h3 style={{ fontSize: 22, marginBottom: 6 }}>Citation metrics</h3>
              <p style={{ fontSize: 14, color: "var(--text-3)" }}>Google Scholar and AVESIS, November 2026.</p>
              <table className="citation-table">
                <thead>
                  <tr>
                    <th>Source</th>
                    <th>Citations</th>
                    <th>h-index</th>
                    <th>i10</th>
                  </tr>
                </thead>
                <tbody>
                  {citationTable.map((r) => (
                    <tr key={r.source}>
                      <td>{r.source}</td>
                      <td>{r.citations}</td>
                      <td>{r.hIndex ?? "—"}</td>
                      <td>{r.i10 ?? "—"}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="section section-alt">
        <div className="container">
          <div className="section-head">
            <Reveal>
              <span className="eyebrow">Resume</span>
              <h2>
                Education &amp; <span className="serif accent">positions</span>
              </h2>
            </Reveal>
          </div>
          <div className="resume-grid">
            <Reveal className="resume-col">
              <h3 className="col-title">
                <GraduationCap /> Education
              </h3>
              <Timeline items={education.map((e) => ({ period: e.period, title: e.degree, org: e.school, detail: e.detail }))} />
            </Reveal>
            <Reveal delay={0.1} className="resume-col">
              <h3 className="col-title">
                <Briefcase /> Academic Positions
              </h3>
              <Timeline items={academicPositions} />
            </Reveal>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="resume-grid">
            <Reveal className="resume-col">
              <h3 className="col-title">
                <Building2 /> Administrative Roles
              </h3>
              <Timeline items={adminRoles} />
            </Reveal>
            <Reveal delay={0.1} className="resume-col">
              <h3 className="col-title">
                <Briefcase /> Industry &amp; Early Career
              </h3>
              <Timeline items={industryExperience} />
            </Reveal>
          </div>
        </div>
      </section>

      <section className="section section-alt">
        <div className="container">
          <div className="resume-grid">
            <Reveal className="resume-col">
              <h3 className="col-title">
                <PenTool /> Editorial &amp; Professional Service
              </h3>
              <Timeline items={service} />
            </Reveal>
            <Reveal delay={0.1} className="resume-col">
              <h3 className="col-title">
                <Languages /> Languages
              </h3>
              <div className="grid-2">
                {languages.map((l) => (
                  <div key={l.name} className="metric-box">
                    <div className="num" style={{ fontSize: 30 }}>
                      {l.name}
                    </div>
                    <div className="lbl">{l.level}</div>
                  </div>
                ))}
              </div>
              <div className="panel" style={{ marginTop: 24 }}>
                <h3 style={{ fontSize: 20 }}>Dissertations</h3>
                <p style={{ marginBottom: 12 }}>
                  <strong>Ph.D. (2000):</strong> Vector Propagation Channels for Smart Antenna Wireless Communication
                  Systems, The University of Texas at Austin.
                </p>
                <p style={{ margin: 0 }}>
                  <strong>M.S. (1996):</strong> Ground Specular Reflection Effects at L-Band and UHF-Band GPS Signals, The
                  University of Texas at Austin.
                </p>
              </div>
            </Reveal>
          </div>
        </div>
      </section>
    </>
  );
}
