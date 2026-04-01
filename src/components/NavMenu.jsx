"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import handleDownload from "../utils/cvDownLoade";
import ThemeToggle from "./ThemeToggle";
import LanguageSelector from "./LanguageSelector";
import { useI18n } from "../i18n/I18nContext";

export default function NavMenu({ title, theme, toggleTheme }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();
  const { t } = useI18n();

  const tabs = [
    { label: t("nav.home"), href: "/" },
    { label: t("nav.about"), href: "/about" },
    { label: t("nav.experience"), href: "/experience" },
    { label: t("nav.projects"), href: "/projects" },
    { label: t("nav.contact"), href: "/contact" },
  ];

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  const isActive = (href) => {
    if (href === "/") return pathname === "/";
    return pathname.startsWith(href);
  };

  return (
    <nav className="nav" aria-label="Main navigation">
      <Link href="/" className="nav__logo" aria-label={t("nav.logoAria")}>
        {title.split(" ")[0]}<span>.</span>
      </Link>

      <div className="nav__tabs" role="list">
        {tabs.map((tab) => (
          <Link
            key={tab.href}
            href={tab.href}
            className={`nav__tab ${isActive(tab.href) ? "nav__tab--active" : ""}`}
            aria-current={isActive(tab.href) ? "page" : undefined}
          >
            {tab.label}
          </Link>
        ))}
      </div>

      <div className="nav__actions">
        <ThemeToggle theme={theme} toggleTheme={toggleTheme} />
        <LanguageSelector />
        <button className="nav__cta" onClick={handleDownload} aria-label={t("nav.downloadCv")}>
          {t("nav.downloadCv")}
        </button>
      </div>

      <button
        className={`hamburger ${menuOpen ? "open" : ""}`}
        onClick={() => setMenuOpen(!menuOpen)}
        aria-expanded={menuOpen}
        aria-controls="mobile-menu"
        aria-label={menuOpen ? t("nav.closeMenu") : t("nav.openMenu")}
      >
        <span className="hamburger__line" aria-hidden="true" />
        <span className="hamburger__line" aria-hidden="true" />
        <span className="hamburger__line" aria-hidden="true" />
      </button>

      {menuOpen && (
        <div
          id="mobile-menu"
          className="nav__mobile"
          role="dialog"
          aria-label="Navigation menu"
          onClick={() => setMenuOpen(false)}
        >
          {tabs.map((tab) => (
            <Link
              key={tab.href}
              href={tab.href}
              className={`nav__mobile-link ${isActive(tab.href) ? "nav__mobile-link--active" : ""}`}
              aria-current={isActive(tab.href) ? "page" : undefined}
              onClick={() => setMenuOpen(false)}
            >
              {tab.label}
            </Link>
          ))}

          <div className="nav__mobile-actions" onClick={(e) => e.stopPropagation()}>
            <ThemeToggle theme={theme} toggleTheme={toggleTheme} />
            <LanguageSelector />
          </div>

          <button
            className="nav__mobile-cta"
            onClick={(e) => { e.stopPropagation(); handleDownload(); setMenuOpen(false); }}
          >
            {t("nav.downloadCv")}
          </button>
        </div>
      )}
    </nav>
  );
}
