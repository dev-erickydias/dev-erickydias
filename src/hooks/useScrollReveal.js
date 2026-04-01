"use client";
import { useEffect } from "react";
import { usePathname } from "next/navigation";

const REVEAL_SELECTORS = ".reveal, .reveal-left, .reveal-right, .reveal-scale";

export default function useScrollReveal() {
  const pathname = usePathname();

  useEffect(() => {
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

    function observeAll() {
      document.querySelectorAll(REVEAL_SELECTORS).forEach((el) => {
        if (!el.classList.contains("visible")) {
          observer.observe(el);
        }
      });
    }

    /* Reset on page change and observe existing elements */
    const timer = setTimeout(() => {
      document.querySelectorAll(REVEAL_SELECTORS).forEach((el) => {
        el.classList.remove("visible");
      });
      observeAll();
    }, 50);

    /* Watch for dynamically added elements (e.g. after API fetch) */
    const mutation = new MutationObserver(() => {
      observeAll();
    });

    mutation.observe(document.body, { childList: true, subtree: true });

    return () => {
      clearTimeout(timer);
      observer.disconnect();
      mutation.disconnect();
    };
  }, [pathname]);
}
