import { useLocation } from "react-router";
import LenisScroll from "../components/shared/LenisScroll";
import Header from "../components/shared/Header";
import AuthModal from "../components/auth/AuthModal";

const RootLayout = ({ children }) => {
  const location = useLocation();
  const isLanding = location.pathname === "/";

  return (
    <LenisScroll>
      <div className="min-h-screen flex flex-col bg-[#050505] text-white">
        <Header sticky={!isLanding} />
        {children}
        <AuthModal />
      </div>
    </LenisScroll>
  );
};

export default RootLayout;

