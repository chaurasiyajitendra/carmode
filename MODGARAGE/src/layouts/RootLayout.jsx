import { useLocation } from "react-router";
import LenisScroll from "../components/shared/LenisScroll";
import Header from "../components/shared/Header";

const RootLayout = ({ children }) => {
  const location = useLocation();
  const isLanding = location.pathname === "/";

  return (
    <LenisScroll>
      <div className="min-h-screen flex flex-col bg-[#050505] text-white">
        <Header sticky={!isLanding} />
        {children}
      </div>
    </LenisScroll>
  );
};

export default RootLayout;
