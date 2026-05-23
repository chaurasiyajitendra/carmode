// usePauseLenis.js
import { useEffect, useContext } from "react";
import { LenisContext } from "./LenisContext";

const usePauseLenis = () => {
  const lenis = useContext(LenisContext);

  useEffect(() => {
    // Re-run and stop Lenis when it is fully initialized in parent
    if (lenis?.lenis) {
      lenis.stop();
    }
    
    // Lock document & body completely to prevent browser viewport scrolling
    document.documentElement.style.overflow = "hidden";
    document.documentElement.style.height = "100%";
    document.body.style.overflow = "hidden";
    document.body.style.height = "100%";

    return () => {
      if (lenis?.lenis) {
        lenis.start();
      }
      document.documentElement.style.overflow = "";
      document.documentElement.style.height = "";
      document.body.style.overflow = "";
      document.body.style.height = "";
    };
  }, [lenis]);
};

export default usePauseLenis;