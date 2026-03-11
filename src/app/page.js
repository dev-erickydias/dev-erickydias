"use client";

import Link from "next/link";
import Header from "../components/Header";
import Hero from "../components/Hero";

/* ── top skills for preview ── */
const topSkills = [
  "React", "Next.js", "TypeScript", "JavaScript", "Node.js",
  "Express", "MongoDB", "Tailwind CSS", "Git", "Docker",
];

/* ── featured projects (first 3) ── */
const featured = [
  {
    name: "SonsOfNode",
    desc: "AI education platform for developers — co-founded initiative addressing educational challenges in Brazil.",
    tags: ["Python", "AI/ML", "Jupyter"],
    href: "https://github.com/SonsOfNode",
  },
  {
    name: "ConnectEco",
    desc: "Sustainable tech platform built collaboratively with 164+ commits. Mobile-first approach.",
    tags: ["React", "Next.js", "CSS"],
    href: "https://connecteco.vercel.app",
  },
  {
    name: "Heavens Hair",
    desc: "Landing page for the beauty salon featuring dynamic routing and responsive design.",
    tags: ["Next.js", "JavaScript", "CSS"],
    href: "https://link-for-instagram.vercel.app",
  },
];

/* ── experience highlights ── */
const highlights = [
  { role: "Co-founder", company: "SonsOfNode", period: "2024 — Present" },
  { role: "Co-founder", company: "ConnectEco", period: "2023 — Present" },
  { role: "Co-owner", company: "Heavens Hair", period: "2022 — Present" },
];

export default function Home() {
  return (
    <>
      <Header />
      <Hero />

      {/* ─── Quick-link cards ─── */}
      <section className="home-cards">
        <div className="home-cards__inner">
          <div className="home-cards__grid">
            {[
              {
                title: "About Me",
                desc: "Trilingual developer from Brazil, living in the Netherlands. 2+ years building modern web apps.",
                href: "/about",
                icon: (
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" /><circle cx="12" cy="7" r="4" />
                  </svg>
                ),
              },
              {
                title: "Experience",
                desc: "Co-founder of SonsOfNode & ConnectEco. Co-owner of Heavens Hair in Amsterdam.",
                href: "/experience",
                icon: (
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="2" y="7" width="20" height="14" rx="2" ry="2" /><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
                  </svg>
                ),
              },
              {
                title: "Projects",
                desc: "6+ projects built with React, Next.js, Node.js, MongoDB, and more.",
                href: "/projects",
                icon: (
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="16 18 22 12 16 6" /><polyline points="8 6 2 12 8 18" />
                  </svg>
                ),
              },
              {
                title: "Contact",
                desc: "Have a project in mind? Let\u2019s connect and build something amazing together.",
                href: "/contact",
                icon: (
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" /><polyline points="22,6 12,13 2,6" />
                  </svg>
                ),
              },
            ].map((item) => (
              <Link key={item.title} href={item.href} className="home-card reveal-scale">
                <div className="home-card__icon">{item.icon}</div>
                <h3 className="home-card__title">{item.title}</h3>
                <p className="home-card__desc">{item.desc}</p>
                <span className="home-card__arrow">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" />
                  </svg>
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ─── About preview ─── */}
      <section className="home-preview">
        <div className="home-preview__inner">
          <div className="section__label reveal">About</div>
          <h2 className="section__title reveal">
            A little about <span className="gradient-text">me</span>
          </h2>

          <div className="home-preview__about reveal">
            <div className="home-preview__about-text">
              <p>
                I&apos;m Ericky Dias, a trilingual Full Stack Developer
                (Portuguese, English, Spanish) with 2+ years of experience
                building modern web applications. With an international
                background spanning Brazil, Portugal, and the Netherlands, I
                bring strong cultural adaptability to every project.
              </p>
            </div>
            <div className="home-preview__stats">
              <div className="home-preview__stat">
                <span className="home-preview__stat-num">2+</span>
                <span className="home-preview__stat-label">Years</span>
              </div>
              <div className="home-preview__stat">
                <span className="home-preview__stat-num">6+</span>
                <span className="home-preview__stat-label">Projects</span>
              </div>
              <div className="home-preview__stat">
                <span className="home-preview__stat-num">3</span>
                <span className="home-preview__stat-label">Languages</span>
              </div>
              <div className="home-preview__stat">
                <span className="home-preview__stat-num">3</span>
                <span className="home-preview__stat-label">Countries</span>
              </div>
            </div>
          </div>

          <Link href="/about" className="home-preview__more reveal">
            Read more about me
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" />
            </svg>
          </Link>
        </div>
      </section>

      {/* ─── Skills preview ─── */}
      <section className="home-preview home-preview--alt">
        <div className="home-preview__inner">
          <div className="section__label reveal">Skills</div>
          <h2 className="section__title reveal">
            My <span className="gradient-text">tech stack</span>
          </h2>

          <div className="home-preview__pills reveal">
            {topSkills.map((s) => (
              <span key={s} className="home-preview__pill">{s}</span>
            ))}
          </div>

          <Link href="/about" className="home-preview__more reveal">
            View full skill set
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" />
            </svg>
          </Link>
        </div>
      </section>

      {/* ─── Experience preview ─── */}
      <section className="home-preview">
        <div className="home-preview__inner">
          <div className="section__label reveal">Experience</div>
          <h2 className="section__title reveal">
            Where I&apos;ve <span className="gradient-text">worked</span>
          </h2>

          <div className="home-preview__exp-list">
            {highlights.map((h) => (
              <div key={h.company} className="home-preview__exp reveal">
                <div className="home-preview__exp-left">
                  <span className="home-preview__exp-role">{h.role}</span>
                  <span className="home-preview__exp-company">{h.company}</span>
                </div>
                <span className="home-preview__exp-period">{h.period}</span>
              </div>
            ))}
          </div>

          <Link href="/experience" className="home-preview__more reveal">
            See full experience
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" />
            </svg>
          </Link>
        </div>
      </section>

      {/* ─── Projects preview ─── */}
      <section className="home-preview home-preview--alt">
        <div className="home-preview__inner">
          <div className="section__label reveal">Work</div>
          <h2 className="section__title reveal">
            Featured <span className="gradient-text">Projects</span>
          </h2>

          <div className="home-preview__projects">
            {featured.map((p) => (
              <a
                key={p.name}
                href={p.href}
                target="_blank"
                rel="noopener noreferrer"
                className="home-preview__project reveal-scale"
              >
                <h3 className="home-preview__project-name">{p.name}</h3>
                <p className="home-preview__project-desc">{p.desc}</p>
                <div className="home-preview__project-tags">
                  {p.tags.map((t) => (
                    <span key={t} className="home-preview__project-tag">{t}</span>
                  ))}
                </div>
              </a>
            ))}
          </div>

          <Link href="/projects" className="home-preview__more reveal">
            View all projects
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" />
            </svg>
          </Link>
        </div>
      </section>
    </>
  );
}
