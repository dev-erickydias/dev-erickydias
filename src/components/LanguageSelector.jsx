"use client";

import { useState, useRef, useEffect } from "react";
import { Globe } from "lucide-react";

const LANGUAGES = [
  { code: "en", label: "EN" },
  { code: "pt", label: "PT" },
  { code: "es", label: "ES" },
];

export default function LanguageSelector() {
  const [open, setOpen] = useState(false);
  const [lang, setLang] = useState("en");
  const ref = useRef(null);

  useEffect(() => {
    const stored = localStorage.getItem("lang");
    if (stored) setLang(stored);
  }, []);

  useEffect(() => {
    const handleClick = (e) => {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false);
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  const select = (code) => {
    setLang(code);
    localStorage.setItem("lang", code);
    setOpen(false);
  };

  return (
    <div className="lang-selector" ref={ref}>
      <button
        className="nav__icon-btn"
        onClick={() => setOpen(!open)}
        aria-label="Change language"
        aria-expanded={open}
        title="Language"
      >
        <Globe size={18} />
        <span className="lang-selector__current">{lang.toUpperCase()}</span>
      </button>

      {open && (
        <div className="lang-selector__dropdown" role="listbox" aria-label="Select language">
          {LANGUAGES.map((l) => (
            <button
              key={l.code}
              className={`lang-selector__option ${lang === l.code ? "lang-selector__option--active" : ""}`}
              onClick={() => select(l.code)}
              role="option"
              aria-selected={lang === l.code}
            >
              {l.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
