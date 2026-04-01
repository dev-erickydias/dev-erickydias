"use client";

import NavMenu from "./NavMenu";
import Footer from "./Footer";
import useScrollReveal from "../hooks/useScrollReveal";
import useNavScroll from "../hooks/useNavScroll";
import useTheme from "../hooks/useTheme";

export default function ClientLayout({ children }) {
  useScrollReveal();
  useNavScroll();
  const { theme, toggleTheme } = useTheme();

  return (
    <>
      <a href="#main-content" className="skip-link">
        Skip to main content
      </a>
      <NavMenu title="Ericky Dias" theme={theme} toggleTheme={toggleTheme} />
      <main id="main-content">{children}</main>
      <Footer />
    </>
  );
}
