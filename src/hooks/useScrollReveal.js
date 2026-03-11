"use client";
import { useEffect } from "react";
import { usePathname } from "next/navigation";

export default function useScrollReveal() {
  const pathname = usePathname();

  useEffect(() => {
    /* Small delay so the new page DOM is painted before observing */
    const timer = setTimeout(() => {
      const elements = document.querySelectorAll(
        ".reveal, .reveal-left, .reveal-right, .reveal-scale"
      );

      if (!elements.length) return;

      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add("visible");
            }
          });
        },
        { threshold: 0.1, rootMargin: "0px 0px -40px 0px" }
      );

      elements.forEach((el) => {
        /* Reset visibility so animations re-trigger on page change */
        el.classList.remove("visible");
        observer.observe(el);
      });

      return () => observer.disconnect();
    }, 50);

    return () => clearTimeout(timer);
  }, [pathname]);
}
