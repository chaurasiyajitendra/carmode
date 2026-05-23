import { useEffect } from "react";
import { useLocation } from "react-router";
import { useLenis } from "../hooks/useLenis";
import Home from "./Home";
import Showcase from "./Showcase";
import About from "./About";
import FeaturedBuilds from "../components/FeturesBuild";
import Categories from "./Category";
import Footer from "../components/Footer";

const Landing = () => {
  const location = useLocation();
  const { scrollTo } = useLenis();

  // Listen to hash transitions on landing mount or hash mutation
  useEffect(() => {
    if (location.hash) {
      // Small timeout to allow component rendering and Lenis initialization
      const timer = setTimeout(() => {
        scrollTo(location.hash, { duration: 1.8 });
      }, 250);
      return () => clearTimeout(timer);
    }
  }, [location.hash, scrollTo]);

  return (
    <main className="bg-[#050505] text-white overflow-x-hidden scrollbar-none">
      {/* HERO SECTION */}
      <section id="home">
        <Home />
      </section>

      {/* FEATURED MACHINES SLIDER */}
      <FeaturedBuilds />

      {/* CATEGORIES DIVISIONS */}
      <Categories />

      {/* SHOWCASE SECTION */}
      <section id="showcase">
        <Showcase />
      </section>

      {/* ABOUT SECTION */}
      <section id="about">
        <About />
      </section>

      {/* FOOTER */}
      <footer id="footer">
        <Footer />
      </footer>
    </main>
  );
};

export default Landing;
