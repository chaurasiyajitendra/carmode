import { useEffect, useMemo, useState, useRef } from "react";
import { useLocation } from "react-router";
import Lenis from "lenis";
import { LenisContext } from "../../hooks/LenisContext";

const LenisScroll = ({ children }) => {
  const [lenisInstance, setLenisInstance] = useState(null);
  const lenisRef = useRef(null);
  const location = useLocation();

  useEffect(() => {
    // Initialize Lenis
    const lenisInst = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: "vertical",
      gestureOrientation: "vertical",
      smoothWheel: true,
      wheelMultiplier: 1.05,
      touchMultiplier: 1.2,
    });

    lenisRef.current = lenisInst;
    
    let stateUpdateFrame;
    stateUpdateFrame = requestAnimationFrame(() => {
      setLenisInstance(lenisInst);
    });

    // Connect requestAnimationFrame loop
    let rafId;
    const raf = (time) => {
      lenisInst.raf(time);
      rafId = requestAnimationFrame(raf);
    };
    rafId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(stateUpdateFrame);
      cancelAnimationFrame(rafId);
      lenisInst.destroy();
    };
  }, []);

  // Scroll to top instantly on route changes
  useEffect(() => {
    if (lenisInstance) {
      lenisInstance.scrollTo(0, { immediate: true });
    }
  }, [location.pathname, lenisInstance]);

  // Stable controller object to avoid render-access-ref lint error
  const value = useMemo(() => ({
    scrollTo: (target, options) => {
      if (lenisInstance) {
        lenisInstance.scrollTo(target, options);
      }
    },
    stop: () => {
      if (lenisInstance) {
        lenisInstance.stop();
      }
    },
    start: () => {
      if (lenisInstance) {
        lenisInstance.start();
      }
    },
    lenis: lenisInstance,
  }), [lenisInstance]);

  return (
    <LenisContext.Provider value={value}>
      {children}
    </LenisContext.Provider>
  );
};

export default LenisScroll;
