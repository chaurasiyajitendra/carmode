import { useContext } from "react";
import { LenisContext } from "./LenisContext";

export const useLenis = () => {
  const lenis = useContext(LenisContext);

  const scrollTo = (target, options = {}) => {
    if (lenis) {
      lenis.scrollTo(target, {
        duration: 1.5,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        ...options,
      });
    } else {
      // Fallback
      const element = typeof target === "string" ? document.querySelector(target) : target;
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  const stop = () => {
    if (lenis) lenis.stop();
  };

  const start = () => {
    if (lenis) lenis.start();
  };

  return {
    lenis,
    scrollTo,
    stop,
    start,
  };
};
