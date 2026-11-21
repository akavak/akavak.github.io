import type { Metadata } from "../../lib/site";
import PageHero from "../../components/PageHero";
import Reveal from "../../components/Reveal";
import { awardIcon } from "../../components/awardIcons";
import { awards } from "../../data/awards";
import { service } from "../../data/profile";

export const metadata: Metadata = {
  title: "Awards & Recognition",
  description: "Awards, competitive grants, patents, editorial appointments and leadership roles of Prof. Dr. Adnan Kavak.",
};

export default function AwardsPage() {
  const kinds = [...new Set(awards.map((a) => a.kind))];
  return (
    <>
      <PageHero
        crumb="Awards"
        eyebrow="Recognition"
        title={
          <>
            Awards &amp; <span className="serif accent">recognition</span>
          </>
        }
        intro="Competitive grants, inventions, editorial appointments and leadership roles recognising contributions to wireless communications and digital health research."
      />

      <section className="section">
        <div className="container">
          <div className="tags" style={{ marginBottom: 36 }}>
            {kinds.map((k) => (
              <span key={k} className="tag">
                {k}: {awards.filter((a) => a.kind === k).length}
              </span>
            ))}
          </div>
          <div className="award-list">
            {awards.map((a, i) => {
              const Icon = awardIcon[a.kind];
              return (
                <Reveal key={a.title} delay={i * 0.04}>
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

      <section className="section section-alt">
        <div className="container">
          <div className="section-head">
            <Reveal>
              <span className="eyebrow">Service to the Community</span>
              <h2>
                Editorial &amp; <span className="serif accent">panel</span> roles
              </h2>
            </Reveal>
          </div>
          <div className="grid-2">
            {service.map((s, i) => (
              <Reveal key={s.org + s.period} delay={i * 0.05}>
                <div className="panel" style={{ height: "100%" }}>
                  <span className="tl-period">{s.period}</span>
                  <h3 style={{ fontSize: 22, marginTop: 8 }}>{s.title}</h3>
                  <p style={{ margin: 0, color: "var(--text)" }}>{s.org}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
