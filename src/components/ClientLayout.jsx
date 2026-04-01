"use client";

import NavMenu from "./NavMenu";
import Footer from "./Footer";
import useScrollReveal from "../hooks/useScrollReveal";
import useNavScroll from "../hooks/useNavScroll";

export default function ClientLayout({ children }) {
  useScrollReveal();
  useNavScroll();

  return (
    <>
      <a href="#main-content" className="skip-link">
        Skip to main content
      </a>
      <NavMenu title="Ericky Dias" />
      <main id="main-content">{children}</main>
      <Footer />
    </>
  );
}
