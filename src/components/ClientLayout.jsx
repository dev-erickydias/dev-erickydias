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
      <NavMenu title="Ericky Dias" />
      <main>{children}</main>
      <Footer />
    </>
  );
}
