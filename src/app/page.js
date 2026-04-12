"use client";

import { useState, useEffect, useMemo } from "react";
import Link from "next/link";
import Header from "../components/Header";
import Hero from "../components/Hero";
import { useI18n } from "../i18n/I18nContext";

const API_URL = "https://api-pearl-nine-29.vercel.app/api/github?user=dev-erickydias&sort=updated&order=desc&per_page=100";

const topSkills = [
  "React", "Next.js", "TypeScript", "JavaScript", "Node.js",
  "Express", "MongoDB", "Tailwind CSS", "Git", "Docker",
];

function formatName(name) {
  return name.replace(/[-_]/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());
}

const highlights = [
  { role: "Co-founder", company: "SonsOfNode", period: "2024 — Present" },
  { role: "Co-founder", company: "ConnectEco", period: "2023 — Present" },
  { role: "Co-owner", company: "Heavens Hair", period: "2022 — Present" },
];

export default function Home() {
  const { t } = useI18n();
  const [rawFeatured, setRawFeatured] = useState([]);

  useEffect(() => {
    fetch(API_URL)
      .then((res) => res.json())
      .then((data) => {
        const repos = data.projects || [];
        const pinned = repos.filter(
          (r) => r.is_pinned && r.name !== "dev-erickydias"
        );
        const shuffled = pinned.sort(() => Math.random() - 0.5).slice(0, 3);
        setRawFeatured(
          shuffled.map((repo) => ({
            rawName: repo.name,
            name: formatName(repo.name),
            apiDescription: repo.description || "",
            technologies: [repo.language, ...(repo.topics || [])].filter(Boolean),
            deploy: repo.homepage || repo.url,
          }))
        );
      })
      .catch(() => {});
  }, []);

  // Re-translate when language changes
  const featured = useMemo(
    () => rawFeatured.map((p) => {
      const key = `repoDescriptions.${p.rawName}`;
      const localized = t(key);
      return { ...p, description: localized && localized !== key ? localized : p.apiDescription };
    }),
    [rawFeatured, t]
  );

  const cards = [
    {
      title: t("homeCards.aboutTitle"), desc: t("homeCards.aboutDesc"), href: "/about",
      icon: <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" /><circle cx="12" cy="7" r="4" /></svg>,
    },
    {
      title: t("homeCards.expTitle"), desc: t("homeCards.expDesc"), href: "/experience",
      icon: <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="7" width="20" height="14" rx="2" ry="2" /><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" /></svg>,
    },
    {
      title: t("homeCards.projTitle"), desc: t("homeCards.projDesc"), href: "/projects",
      icon: <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="16 18 22 12 16 6" /><polyline points="8 6 2 12 8 18" /></svg>,
    },
    {
      title: t("homeCards.contactTitle"), desc: t("homeCards.contactDesc"), href: "/contact",
      icon: <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" /><polyline points="22,6 12,13 2,6" /></svg>,
    },
  ];

  return (
    <>
      <Header />
      <Hero />

      <section className="home-cards">
        <div className="home-cards__inner">
          <h2 className="sr-only">{t('homeCards.sectionTitle') || 'Explore'}</h2>
          <div className="home-cards__grid">
            {cards.map((item) => (
              <Link key={item.href} href={item.href} className="home-card reveal-scale">
                <div className="home-card__icon">{item.icon}</div>
                <h3 className="home-card__title">{item.title}</h3>
                <p className="home-card__desc">{item.desc}</p>
                <span className="home-card__arrow">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" /></svg>
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="home-preview">
        <div className="home-preview__inner">
          <div className="section__label reveal">{t("homePreview.aboutLabel")}</div>
          <h2 className="section__title reveal">{t("homePreview.aboutTitle")} <span className="gradient-text">{t("homePreview.aboutTitleAccent")}</span></h2>
          <div className="home-preview__about reveal">
            <div className="home-preview__about-text"><p>{t("homePreview.aboutText")}</p></div>
            <div className="home-preview__stats">
              <div className="home-preview__stat"><span className="home-preview__stat-num">2+</span><span className="home-preview__stat-label">{t("homePreview.years")}</span></div>
              <div className="home-preview__stat"><span className="home-preview__stat-num">9+</span><span className="home-preview__stat-label">{t("homePreview.projects")}</span></div>
              <div className="home-preview__stat"><span className="home-preview__stat-num">3</span><span className="home-preview__stat-label">{t("homePreview.languages")}</span></div>
              <div className="home-preview__stat"><span className="home-preview__stat-num">3</span><span className="home-preview__stat-label">{t("homePreview.countries")}</span></div>
            </div>
          </div>
          <Link href="/about" className="home-preview__more reveal">{t("homePreview.readMore")} <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" /></svg></Link>
        </div>
      </section>

      <section className="home-preview home-preview--alt">
        <div className="home-preview__inner">
          <div className="section__label reveal">{t("homePreview.skillsLabel")}</div>
          <h2 className="section__title reveal">{t("homePreview.skillsTitle")} <span className="gradient-text">{t("homePreview.skillsTitleAccent")}</span></h2>
          <div className="home-preview__pills reveal">{topSkills.map((s) => (<span key={s} className="home-preview__pill">{s}</span>))}</div>
          <Link href="/about" className="home-preview__more reveal">{t("homePreview.viewSkills")} <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" /></svg></Link>
        </div>
      </section>

      <section className="home-preview">
        <div className="home-preview__inner">
          <div className="section__label reveal">{t("homePreview.expLabel")}</div>
          <h2 className="section__title reveal">{t("homePreview.expTitle")} <span className="gradient-text">{t("homePreview.expTitleAccent")}</span></h2>
          <div className="home-preview__exp-list">
            {highlights.map((h) => (
              <div key={h.company} className="home-preview__exp reveal">
                <div className="home-preview__exp-left"><span className="home-preview__exp-role">{h.role}</span><span className="home-preview__exp-company">{h.company}</span></div>
                <span className="home-preview__exp-period">{h.period}</span>
              </div>
            ))}
          </div>
          <Link href="/experience" className="home-preview__more reveal">{t("homePreview.seeExp")} <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" /></svg></Link>
        </div>
      </section>

      <section className="home-preview home-preview--alt">
        <div className="home-preview__inner">
          <div className="section__label reveal">{t("homePreview.workLabel")}</div>
          <h2 className="section__title reveal">{t("homePreview.workTitle")} <span className="gradient-text">{t("homePreview.workTitleAccent")}</span></h2>
          <div className="home-preview__projects">
            {featured.map((p) => (
              <a key={p.name} href={p.deploy} target="_blank" rel="noopener noreferrer" className="home-preview__project reveal-scale">
                <h3 className="home-preview__project-name">{p.name}</h3>
                <p className="home-preview__project-desc">{p.description}</p>
                <div className="home-preview__project-tags">{p.technologies.slice(0, 3).map((tech) => (<span key={tech} className="home-preview__project-tag">{tech}</span>))}</div>
              </a>
            ))}
          </div>
          <Link href="/projects" className="home-preview__more reveal">{t("homePreview.viewAll")} <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" /></svg></Link>
        </div>
      </section>
    </>
  );
}
