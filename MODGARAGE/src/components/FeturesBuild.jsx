import { useState, useEffect } from "react";
import { Link } from "react-router";
import { Swiper, SwiperSlide } from "swiper/react";
import {
  EffectCoverflow,
  Autoplay,
  Navigation,
} from "swiper/modules";

import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/navigation";

const builds = [
  {
    name: "NISSAN GTR R35",
    type: "STREET MONSTER",
    power: "900HP",
    color: "from-red-500/30",
    image:
      "https://images.unsplash.com/photo-1544636331-e26879cd4d9b?q=80&w=1600&auto=format&fit=crop",
    carId: 2,
  },

  {
    name: "SUPRA MK4",
    type: "DRIFT SPEC",
    power: "720HP",
    color: "from-orange-500/30",
    image:
      "https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?q=80&w=1600&auto=format&fit=crop",
    carId: 1,
  },

  {
    name: "PORSCHE GT3",
    type: "TRACK BUILD",
    power: "640HP",
    color: "from-blue-500/30",
    image:
      "https://images.unsplash.com/photo-1503376780353-7e6692767b70?q=80&w=1600&auto=format&fit=crop",
    carId: 34,
  },

  {
    name: "BMW M4",
    type: "EURO PERFORMANCE",
    power: "700HP",
    color: "from-purple-500/30",
    image:
      "https://images.unsplash.com/photo-1553440569-bcc63803a83d?q=80&w=1600&auto=format&fit=crop",
    carId: 41,
  },
];

const FeaturedBuilds = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <section className="relative overflow-hidden bg-[#050505] py-20 md:py-32 text-white">

      {/* TOP */}
      <div className="mb-12 md:mb-20 text-center px-4">
        <p className="mb-3 text-[10px] sm:text-xs md:text-sm tracking-[0.35em] text-white/40">
          PREMIUM CUSTOM BUILDS
        </p>

        <h1 className="text-4xl sm:text-6xl font-black uppercase tracking-[0.08em] md:text-8xl">
          FEATURED
          <span className="block text-white/15">
            MACHINES
          </span>
        </h1>
      </div>

      {/* SLIDER */}
      <div className="relative">
        <Swiper
          modules={[
            EffectCoverflow,
            Autoplay,
            Navigation,
          ]}
          effect="coverflow"
          centeredSlides={true}
          slidesPerView={"auto"}
          loop={true}
          speed={1200}
          autoplay={{
            delay: 3500,
            disableOnInteraction: false,
          }}
          navigation={{
            nextEl: ".next-btn",
            prevEl: ".prev-btn",
          }}
          coverflowEffect={{
            rotate: 0,
            stretch: isMobile ? -20 : -80,
            depth: isMobile ? 100 : 250,
            modifier: isMobile ? 1.5 : 2.5,
            scale: isMobile ? 0.9 : 0.82,
            slideShadows: false,
          }}
          className="featuredSwiper"
        >
          {builds.map((car, index) => (
            <SwiperSlide
              key={index}
              className="!w-[88vw] md:!w-[1000px] cursor-grab"
            >
              <div className="relative h-[360px] sm:h-[450px] md:h-[500px] overflow-hidden rounded-[24px] sm:rounded-[35px] border border-white/10 bg-[#0b0b0b]">

                {/* IMAGE */}
                <img
                  src={car.image}
                  alt={car.name}
                  className="absolute inset-0 h-full w-full object-cover"
                />

                {/* OVERLAY */}
                <div className="absolute inset-0 bg-gradient-to-r from-black via-black/40 to-transparent" />

                {/* ACTIVE COLOR GLOW */}
                <div
                  className={`absolute inset-0 bg-gradient-to-r ${car.color} to-transparent opacity-0 transition duration-700 swiper-slide-active:opacity-100`}
                />

                {/* CONTENT */}
                <div className="absolute left-6 sm:left-10 top-1/2 z-10 max-w-xs sm:max-w-xl -translate-y-1/2 text-left">
                  <p className="mb-2 sm:mb-4 text-[9px] sm:text-xs tracking-[0.35em] text-white/50">
                    {car.type}
                  </p>

                  <h2 className="text-3xl sm:text-5xl font-black uppercase leading-tight tracking-[0.08em] md:text-7xl">
                    {car.name}
                  </h2>

                  <div className="mt-6 sm:mt-8 flex items-center gap-4 sm:gap-6">
                    <div className="rounded-2xl border border-white/15 bg-white/10 px-4 py-2 sm:px-6 sm:py-3 backdrop-blur-xl shrink-0">
                      <p className="text-[8px] sm:text-xs tracking-[0.25em] text-white/50">
                        POWER
                      </p>
                      <h3 className="mt-0.5 text-sm sm:text-lg font-bold">
                        {car.power}
                      </h3>
                    </div>

                    <Link
                      to={`/single/${car.carId}`}
                      className="rounded-full border border-white/15 bg-white px-5 py-3 sm:px-7 sm:py-4 text-[9px] sm:text-xs font-bold tracking-[0.25em] text-black transition hover:scale-105 inline-block text-center"
                    >
                      VIEW BUILD
                    </Link>
                  </div>
                </div>

                {/* BIG TEXT */}
                <h1 className="absolute bottom-[-20px] sm:bottom-[-30px] right-4 text-[80px] sm:text-[170px] font-black uppercase leading-none text-white/5">
                  MOD
                </h1>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
};

export default FeaturedBuilds;