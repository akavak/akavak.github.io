import Link from "next/link";
import { ArrowUpRight, BookOpen, Briefcase, Check, Download, GraduationCap, PenTool, Sparkles } from "lucide-react";
import { awardIcon } from "@/components/awardIcons";
import Reveal from "@/components/Reveal";
import Counter from "@/components/Counter";
import Socials from "@/components/Socials";
import PubItem from "@/components/PubItem";
import CoverArt from "@/components/CoverArt";
import AreaIcon from "@/components/AreaIcon";
import { academicPositions, education, metrics, profile, researchAreas, wins } from "@/data/profile";
import { projects } from "@/data/projects";
import { awards } from "@/data/awards";
import { posts } from "@/data/blog";
import { featured, publications } from "@/lib/pubs";
import { asset } from "@/lib/site";

const marqueeWords = [
  "6G Wireless",
  "Trustworthy Medical AI",
  "Smart Antennas",
  "Large Language Models",
  "Internet of Things",
  "Digital Health",
  "Network Slicing",
  "Backscatter Communication",
  "V2X & Digital Twins",
];

function formatDate(d: string) {
  return new Date(d).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" });
}

export default function Home() {
  const areaCount = (key: string) => publications.filter((p) => p.topics.includes(key)).length;
  const featuredProjects = projects.filter((p) => p.featured).slice(0, 3);
  const firstYear = Math.min(...publications.map((p) => p.year));
  const years = new Date().getFullYear() - 1992; // career since B.S. graduation (1992)

  return (
    <>
      {/* ---------- HERO ---------- */}
      <section className="hero">
        <div className="container">
          <div className="hero-grid">
            <div>
              <Reveal>
                <span className="hero-badge">
                  <b>Prof. Dr.</b> Computer Engineering · Kocaeli University
                </span>
              </Reveal>
              <Reveal delay={0.08}>
                <h1>
                  Engineering <span className="serif">intelligent</span> wireless systems &amp; trustworthy AI for{" "}
                  <span className="serif">health</span>.
                </h1>
              </Reveal>
              <Reveal delay={0.16}>
                <p className="hero-lead">
                  I am <strong style={{ color: "var(--text)" }}>Adnan Kavak</strong>, Professor in the Department of
                  Computer Engineering at Kocaeli University and leader of the WINS Research Center. My group works on 6G
                  networks, smart antennas and IoT, and on clinically grounded AI that helps people manage diabetes every day.
                </p>
              </Reveal>
              <Reveal delay={0.24}>
                <div className="hero-cta">
                  <Link href="/publications/" className="btn btn-primary">
                    Explore Publications <ArrowUpRight />
                  </Link>
                  <a href={asset(profile.cv)} className="btn btn-outline" target="_blank" rel="noopener">
                    Download CV <Download />
                  </a>
                </div>
              </Reveal>
              <Reveal delay={0.3}>
                <Socials withEmail />
              </Reveal>
            </div>

            <Reveal delay={0.2} className="hero-photo">
              <div className="frame">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={asset(profile.photo)} alt={`Portrait of ${profile.fullName}`} width={420} height={525} />
              </div>
              <div className="spin-badge" aria-hidden="true">
                <svg className="ring" viewBox="0 0 120 120">
                  <defs>
                    <path id="circle" d="M60,60 m-46,0 a46,46 0 1,1 92,0 a46,46 0 1,1 -92,0" />
                  </defs>
                  <text>
                    <textPath href="#circle">Researcher · Educator · Inventor · </textPath>
                  </text>
                </svg>
                <span className="core">
                  <Sparkles />
                </span>
              </div>
              <div className="hero-card c1">
                <span className="ic">
                  <GraduationCap />
                </span>
                <span>
                  Ph.D., UT Austin
                  <small>Electrical &amp; Computer Eng.</small>
                </span>
              </div>
              <div className="hero-card c2">
                <span className="ic">
                  <PenTool />
                </span>
                <span>
                  Associate Editor
                  <small>IEEE Access</small>
                </span>
              </div>
            </Reveal>
          </div>

          <Reveal delay={0.1}>
            <div className="stats" style={{ marginTop: 80 }}>
              {metrics.map((m) => (
                <div className="stat" key={m.label}>
                  <div className="num">
                    <Counter value={m.value} suffix={m.suffix} />
                  </div>
                  <div className="lbl">{m.label}</div>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* ---------- MARQUEE ---------- */}
      <div className="marquee-wrap">
      <div className="marquee" aria-hidden="true">
        <div className="marquee-track">
          {[0, 1].map((k) => (
            <span key={k}>
              {marqueeWords.map((w) => (
                <span key={w + k}>
                  {w} <i>✦</i>
                </span>
              ))}
            </span>
          ))}
        </div>
      </div>
      </div>

      {/* ---------- ABOUT ---------- */}
      <section className="section">
        <div className="container about-grid">
          <Reveal>
            <div className="exp-card">
              <div className="big">{years}+</div>
              <h3>Years in wireless communications research, industry &amp; teaching</h3>
              <p>From satellite control engineering and Samsung&apos;s CDMA labs to leading a research center for intelligent systems.</p>
              <div className="timeline-mini">
                <div>
                  <b>1992</b>B.S., METU
                </div>
                <div>
                  <b>2000</b>Ph.D., UT Austin
                </div>
                <div>
                  <b>2011</b>Full Professor
                </div>
              </div>
            </div>
          </Reveal>
          <Reveal delay={0.12} className="about-text">
            <span className="eyebrow">About Me</span>
            <h2 className="h2" style={{ marginBottom: 24 }}>
              Bridging <span className="serif accent">wireless</span> engineering and{" "}
              <span className="serif accent">human</span> health.
            </h2>
            <p className="lead">{profile.bio[0]}</p>
            <ul className="check-list">
              <li>
                <Check /> Head of Department, 2013 – 2015
              </li>
              <li>
                <Check /> Leader, WINS Research Center
              </li>
              <li>
                <Check /> Associate Editor, IEEE Access
              </li>
              <li>
                <Check /> Inventor on 5 US patents &amp; applications
              </li>
            </ul>
            <Link href="/about/" className="btn btn-primary">
              More About Me <ArrowUpRight />
            </Link>
          </Reveal>
        </div>
      </section>

      {/* ---------- RESEARCH AREAS ---------- */}
      <section className="section section-alt">
        <div className="container">
          <div className="section-head">
            <Reveal>
              <span className="eyebrow">What I Work On</span>
              <h2>
                Research that turns <span className="serif accent">signals</span> into insight.
              </h2>
            </Reveal>
            <Reveal delay={0.1}>
              <p>
                Five connected themes, from the physics of radio propagation to AI assistants that help patients manage
                chronic disease every day.
              </p>
            </Reveal>
          </div>
          <div className="cards">
            {researchAreas.map((a, i) => (
              <Reveal key={a.key} delay={i * 0.06}>
                <Link href={`/publications/?topic=${encodeURIComponent(a.key)}`} className="card" style={{ display: "block", height: "100%" }}>
                  <span className="num">0{i + 1}</span>
                  <span className="ic">
                    <AreaIcon name={a.icon} />
                  </span>
                  <h3>{a.title}</h3>
                  <p>{a.text}</p>
                  <div className="meta">
                    <span>{areaCount(a.key)} publications</span>
                    <ArrowUpRight size={18} />
                  </div>
                </Link>
              </Reveal>
            ))}
            <Reveal delay={0.3}>
              <div className="card cta-card" style={{ height: "100%" }}>
                <div>
                  <h3 style={{ fontSize: 28 }}>Interested in collaborating?</h3>
                  <p>Prospective PhD students, postdocs and industry partners are welcome to reach out.</p>
                </div>
                <Link href="/contact/" className="btn">
                  Get in Touch <ArrowUpRight />
                </Link>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ---------- SELECTED PUBLICATIONS ---------- */}
      <section className="section">
        <div className="container">
          <div className="section-head">
            <Reveal>
              <span className="eyebrow">Selected Publications</span>
              <h2>
                Recent and <span className="serif accent">influential</span> work.
              </h2>
            </Reveal>
            <Reveal delay={0.1}>
              <Link href="/publications/" className="link-arrow">
                Full publication list since {firstYear} <ArrowUpRight />
              </Link>
            </Reveal>
          </div>
          <div className="pub-list">
            {featured.slice(0, 6).map((p, i) => (
              <Reveal key={p.id} delay={i * 0.04}>
                <PubItem p={p} showTopics={false} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ---------- PROJECTS ---------- */}
      <section className="section section-alt">
        <div className="container">
          <div className="section-head">
            <Reveal>
              <span className="eyebrow">Funded Projects</span>
              <h2>
                From the lab to <span className="serif accent">real</span> patients and networks.
              </h2>
            </Reveal>
            <Reveal delay={0.1}>
              <Link href="/projects/" className="link-arrow">
                All projects &amp; patents <ArrowUpRight />
              </Link>
            </Reveal>
          </div>
          <div className="grid-3">
            {featuredProjects.map((p, i) => (
              <Reveal key={p.slug} delay={i * 0.08}>
                <div className="project-card">
                  <div className="top">
                    <span className="tag hl">{p.funder.split(" (")[0].replace("Health Institutes of Türkiye", "TÜSEB")}</span>
                    <span style={{ fontSize: 14, fontWeight: 700 }}>{p.period}</span>
                  </div>
                  <h3>{p.title}</h3>
                  <p>{p.summary}</p>
                  <div className="foot">
                    <span>{p.role}</span>
                    <b>{p.area}</b>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ---------- RESUME ---------- */}
      <section className="section">
        <div className="container">
          <div className="section-head">
            <Reveal>
              <span className="eyebrow">Education &amp; Experience</span>
              <h2>
                An academic <span className="serif accent">journey</span>.
              </h2>
            </Reveal>
            <Reveal delay={0.1}>
              <Link href="/about/" className="link-arrow">
                Full background <ArrowUpRight />
              </Link>
            </Reveal>
          </div>
          <div className="resume-grid">
            <Reveal className="resume-col">
              <h3 className="col-title">
                <GraduationCap /> Education
              </h3>
              <div className="timeline">
                {education.map((e) => (
                  <div className="tl-item" key={e.degree}>
                    <span className="tl-period">{e.period}</span>
                    <h4>{e.degree}</h4>
                    <div className="org">{e.school}</div>
                  </div>
                ))}
              </div>
            </Reveal>
            <Reveal delay={0.1} className="resume-col">
              <h3 className="col-title">
                <Briefcase /> Academic Positions
              </h3>
              <div className="timeline">
                {academicPositions.slice(0, 4).map((e) => (
                  <div className="tl-item" key={e.period + e.title}>
                    <span className="tl-period">{e.period}</span>
                    <h4>{e.title}</h4>
                    <div className="org">{e.org}</div>
                  </div>
                ))}
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ---------- AWARDS ---------- */}
      <section className="section section-alt">
        <div className="container">
          <div className="section-head">
            <Reveal>
              <span className="eyebrow">Recognition</span>
              <h2>
                Awards, grants &amp; <span className="serif accent">service</span>.
              </h2>
            </Reveal>
            <Reveal delay={0.1}>
              <Link href="/awards/" className="link-arrow">
                View all <ArrowUpRight />
              </Link>
            </Reveal>
          </div>
          <div className="award-list">
            {awards.slice(0, 4).map((a, i) => {
              const Icon = awardIcon[a.kind];
              return (
                <Reveal key={a.title} delay={i * 0.05}>
                  <div className="award">
                    <span className="ic">
                      <Icon />
                    </span>
                    <div>
                      <span className="year">{a.year}</span>
                      <h3>{a.title}</h3>
                      <span className="org">{a.org}</span>
                    </div>
                    <p>{a.description}</p>
                    <span className="label">{a.kind}</span>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* ---------- WINS ---------- */}
      <section className="section">
        <div className="container about-grid">
          <Reveal>
            <span className="eyebrow">Research Group</span>
            <h2 className="h2" style={{ marginBottom: 24 }}>
              The <span className="serif accent">WINS</span> Research Center
            </h2>
            <p className="lead" style={{ fontSize: 20, color: "var(--text)" }}>
              {wins.name}
            </p>
            <p>{wins.about[0]}</p>
            <div className="tags" style={{ margin: "22px 0 32px" }}>
              {wins.topics.map((t) => (
                <span key={t} className="tag">
                  {t}
                </span>
              ))}
            </div>
            <Link href="/research/#wins" className="btn btn-primary">
              Meet the Team <ArrowUpRight />
            </Link>
          </Reveal>
          <Reveal delay={0.12}>
            <div className="grid-2">
              {wins.stats.map((s) => (
                <div className="metric-box" key={s.label}>
                  <div className="num">
                    <Counter value={s.value} />
                  </div>
                  <div className="lbl">{s.label}</div>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* ---------- BLOG ---------- */}
      <section className="section section-alt">
        <div className="container">
          <div className="section-head">
            <Reveal>
              <span className="eyebrow">News &amp; Insights</span>
              <h2>
                Latest from the <span className="serif accent">blog</span>.
              </h2>
            </Reveal>
            <Reveal delay={0.1}>
              <Link href="/blog/" className="link-arrow">
                All posts <BookOpen size={18} />
              </Link>
            </Reveal>
          </div>
          <div className="blog-grid">
            {posts.slice(0, 3).map((p, i) => (
              <Reveal key={p.slug} delay={i * 0.08}>
                <Link href={`/blog/${p.slug}/`} className="post-card">
                  <CoverArt variant={p.cover} />
                  <div className="post-meta">
                    <span className="cat">{p.category}</span>
                    <span>{formatDate(p.date)}</span>
                  </div>
                  <h3>{p.title}</h3>
                  <p>{p.excerpt}</p>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ---------- CTA ---------- */}
      <section className="section-sm">
        <div className="container">
          <Reveal>
            <div className="cta-band">
              <span className="ring" aria-hidden="true" />
              <h2>
                Let&apos;s build the <span className="serif">next</span> generation of intelligent systems.
              </h2>
              <div>
                <p>
                  Open to research collaborations, graduate supervision, industry partnerships, keynote and editorial
                  invitations.
                </p>
                <Link href="/contact/" className="btn">
                  Start a Conversation <ArrowUpRight />
                </Link>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
