import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import { motion } from "framer-motion";
import { Award, ArrowLeft } from "lucide-react";

import RegisterForm from "../../components/forms/RegisterForm";
import { selectIsAuthenticated } from "../../features/auth/authSelectors";
import { clearAuthError } from "../../features/auth/authSlice";

const Register = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isAuthenticated = useSelector(selectIsAuthenticated);

  // Clear linter errors on mounting
  useEffect(() => {
    dispatch(clearAuthError());
  }, [dispatch]);

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/vehicles", { replace: true });
    }
  }, [isAuthenticated, navigate]);

  return (
    <div className="min-h-screen bg-[#050508] text-white flex items-center justify-center p-4 relative overflow-hidden select-none">
      
      {/* ── BACKGROUND VISUALS ── */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        {/* Cinematic dark luxury car profile background */}
        <img
          src="https://images.unsplash.com/photo-1503376780353-7e6692767b70?q=80&w=1600&auto=format&fit=crop"
          alt="Luxury Showroom Background"
          className="w-full h-full object-cover filter brightness-[0.14] contrast-[1.05] saturate-[0.1]"
        />
        {/* Soft radial grid overlay floor */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(5,5,8,0.2)_0%,#050508_80%)]" />
        
        {/* Glowing backdrop shadow lights */}
        <div className="absolute top-1/4 right-1/4 w-[400px] h-[400px] rounded-full bg-[#ffd700]/5 filter blur-[120px] animate-pulse" />
        <div className="absolute bottom-1/4 left-1/4 w-[400px] h-[400px] rounded-full bg-red-500/3 filter blur-[120px]" />
      </div>

      {/* Floating Back Control Button */}
      <button
        onClick={() => navigate("/vehicles")}
        className="absolute top-6 left-6 z-20 flex items-center gap-2 px-4.5 py-2.5 rounded-full border border-white/5 bg-black/40 text-white/50 hover:text-white hover:border-white/15 transition-all duration-300 cursor-pointer text-[9px] font-black tracking-widest font-mono backdrop-blur-md"
      >
        <ArrowLeft size={11} />
        FLEET CATALOG
      </button>

      {/* ── REGISTER DECK CARD ── */}
      <motion.div
        initial={{ opacity: 0, y: 30, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.55, ease: [0.25, 1, 0.5, 1] }}
        className="relative z-10 w-full max-w-md bg-[#0a0a0d]/75 border border-white/10 rounded-[32px] p-8 backdrop-blur-2xl shadow-2xl overflow-hidden mt-10"
        style={{
          boxShadow: "0 30px 65px -25px rgba(0, 0, 0, 0.95)"
        }}
      >
        {/* Top telemetry marker */}
        <div className="text-center mb-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-white/5 bg-white/[0.02] text-[8px] font-black tracking-[0.3em] text-white/40 font-mono mb-3">
            <Award size={10} className="text-[#ffd700]" />
            MODGARAGE SYSTEMS CORE
          </div>
          
          <h2 className="text-2xl font-black tracking-tight text-white">
            PILOT <span className="text-white/40 font-light">LICENCE</span>
          </h2>
          <p className="text-[10px] text-white/30 tracking-wider uppercase mt-1">
            Register credentials to save specs and comparing boards
          </p>
        </div>

        {/* RegisterForm render */}
        <RegisterForm onSuccessRedirect="/vehicles" />

        {/* Footer switch router */}
        <div className="border-t border-white/5 pt-5 mt-6 text-center">
          <p className="text-[10px] text-white/30 font-bold uppercase tracking-wider">
            Licensed pilot?{" "}
            <button
              onClick={() => navigate("/login")}
              className="text-[#ffd700] hover:text-[#ffaa00] transition cursor-pointer"
            >
              Access active workspace
            </button>
          </p>
        </div>
      </motion.div>

    </div>
  );
};

export default Register;
