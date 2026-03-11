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

  // Lock body scroll when mobile menu open
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  const isActive = (href) => {
    if (href === "/") return pathname === "/";
    return pathname.startsWith(href);
  };

  return (
    <nav className="nav">
      <Link href="/" className="nav__logo">
        {title.split(" ")[0]}<span>.</span>
      </Link>

      {/* Desktop tab bar */}
      <div className="nav__tabs">
        {tabs.map((tab) => (
          <Link
            key={tab.label}
            href={tab.href}
            className={`nav__tab ${isActive(tab.href) ? "nav__tab--active" : ""}`}
          >
            {tab.label}
          </Link>
        ))}
      </div>

      <button className="nav__cta" onClick={handleDownload}>
        Download CV
      </button>

      {/* Hamburger */}
      <div
        className={`hamburger ${menuOpen ? "open" : ""}`}
        onClick={() => setMenuOpen(!menuOpen)}
      >
        <span className="hamburger__line" />
        <span className="hamburger__line" />
        <span className="hamburger__line" />
      </div>

      {/* Mobile overlay */}
      {menuOpen && (
        <div className="nav__mobile" onClick={() => setMenuOpen(false)}>
          {tabs.map((tab) => (
            <Link
              key={tab.label}
              href={tab.href}
              className={`nav__mobile-link ${isActive(tab.href) ? "nav__mobile-link--active" : ""}`}
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
