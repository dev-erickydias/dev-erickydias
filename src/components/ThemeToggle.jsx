"use client";

import { Sun, Moon } from "lucide-react";
import { useI18n } from "../i18n/I18nContext";

export default function ThemeToggle({ theme, toggleTheme }) {
  const { t } = useI18n();

  return (
    <button
      className="nav__icon-btn"
      onClick={toggleTheme}
      aria-label={theme === "dark" ? t("theme.toLight") : t("theme.toDark")}
      title={theme === "dark" ? t("theme.light") : t("theme.dark")}
    >
      {theme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
    </button>
  );
}
