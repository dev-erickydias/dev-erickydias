"use client";

import { useState, useRef, useEffect } from "react";
import { Globe } from "lucide-react";
import { useI18n } from "../i18n/I18nContext";

const LANGUAGES = [
  { code: "en", label: "EN" },
  { code: "pt", label: "PT" },
  { code: "es", label: "ES" },
];

export default function LanguageSelector() {
  const [open, setOpen] = useState(false);
  const { lang, changeLang, t } = useI18n();
  const ref = useRef(null);

  useEffect(() => {
    const handleClick = (e) => {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false);
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  const select = (code) => {
    changeLang(code);
    setOpen(false);
  };

  return (
    <div className="lang-selector" ref={ref}>
      <button
        className="nav__icon-btn"
        onClick={() => setOpen(!open)}
        aria-label={`${lang.toUpperCase()} — ${t("lang.change")}`}
        aria-expanded={open}
        title={t("lang.title")}
      >
        <Globe size={18} aria-hidden="true" />
        <span className="lang-selector__current">{lang.toUpperCase()}</span>
      </button>

      {open && (
        <div className="lang-selector__dropdown" role="listbox" aria-label={t("lang.select")}>
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
