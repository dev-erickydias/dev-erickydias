import Contact from "../../components/Contact";
import ContactExtra from "../../components/ContactExtra";

export const metadata = {
  title: "Contact",
  description:
    "Get in touch with Ericky Dias. Open to full-time, part-time, or freelance opportunities. Available for remote or hybrid positions in the Netherlands and worldwide.",
  openGraph: {
    title: "Contact — Ericky Dias",
    description:
      "Have a project in mind? Let's connect and build something amazing together.",
  },
  alternates: {
    canonical: "/contact",
  },
};

export default function ContactPage() {
  return (
    <>
      <div className="page-header">
        <div className="page-header__inner">
          <div className="section__label reveal">Contact</div>
          <h1 className="page-header__title reveal">
            Let&apos;s <span className="gradient-text">connect</span>
          </h1>
          <p className="page-header__sub reveal">
            I&apos;m always open to new opportunities and interesting projects.
          </p>
        </div>
      </div>

      <Contact />
      <ContactExtra />
    </>
  );
}
