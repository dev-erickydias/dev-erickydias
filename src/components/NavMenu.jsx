"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import handleDownload from "../utils/cvDownLoade";

const tabs = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Experience", href: "/experience" },
  { label: "Projects", href: "/projects" },
  { label: "Contact", href: "/contact" },
];

export default function NavMenu({ title }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();

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
      <Link href="/" className="nav__logo" aria-label="Ericky Dias — Home">
        {title.split(" ")[0]}<span>.</span>
      </Link>

      <div className="nav__tabs" role="list">
        {tabs.map((tab) => (
          <Link
            key={tab.label}
            href={tab.href}
            className={`nav__tab ${isActive(tab.href) ? "nav__tab--active" : ""}`}
            aria-current={isActive(tab.href) ? "page" : undefined}
          >
            {tab.label}
          </Link>
        ))}
      </div>

      <button className="nav__cta" onClick={handleDownload} aria-label="Download CV as PDF">
        Download CV
      </button>

      <button
        className={`hamburger ${menuOpen ? "open" : ""}`}
        onClick={() => setMenuOpen(!menuOpen)}
        aria-expanded={menuOpen}
        aria-controls="mobile-menu"
        aria-label={menuOpen ? "Close navigation menu" : "Open navigation menu"}
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
              key={tab.label}
              href={tab.href}
              className={`nav__mobile-link ${isActive(tab.href) ? "nav__mobile-link--active" : ""}`}
              aria-current={isActive(tab.href) ? "page" : undefined}
              onClick={() => setMenuOpen(false)}
            >
              {tab.label}
            </Link>
          ))}
          <button
            className="nav__mobile-cta"
            onClick={(e) => { e.stopPropagation(); handleDownload(); setMenuOpen(false); }}
          >
            Download CV
          </button>
        </div>
      )}
    </nav>
  );
}
