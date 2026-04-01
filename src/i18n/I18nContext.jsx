"use client";

import { createContext, useContext, useState, useEffect, useCallback, useMemo } from "react";
import { translations, defaultLang, supportedLangs } from "./index";

const I18nContext = createContext(null);

function getNestedValue(obj, path) {
  return path.split(".").reduce((acc, key) => acc?.[key], obj);
}

export function I18nProvider({ children }) {
  const [lang, setLang] = useState(defaultLang);

  useEffect(() => {
    const stored = localStorage.getItem("lang");
    if (stored && supportedLangs.includes(stored)) {
      setLang(stored);
      document.documentElement.lang = stored;
    }
  }, []);

  const changeLang = useCallback((code) => {
    if (supportedLangs.includes(code)) {
      setLang(code);
      localStorage.setItem("lang", code);
      document.documentElement.lang = code;
    }
  }, []);

  const t = useCallback(
    (key) => {
      const value = getNestedValue(translations[lang], key);
      if (value !== undefined) return value;
      const fallback = getNestedValue(translations[defaultLang], key);
      return fallback !== undefined ? fallback : key;
    },
    [lang]
  );

  const value = useMemo(() => ({ lang, changeLang, t }), [lang, changeLang, t]);

  return (
    <I18nContext.Provider value={value}>
      {children}
    </I18nContext.Provider>
  );
}

export function useI18n() {
  const ctx = useContext(I18nContext);
  if (!ctx) throw new Error("useI18n must be used within I18nProvider");
  return ctx;
}
