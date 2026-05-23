import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { Lock, Mail, Eye, EyeOff, Loader2, ArrowRight } from "lucide-react";

import { loginStart, loginSuccess, loginFailure } from "../../features/auth/authSlice";
import { loginUserMock } from "../../features/auth/authUtils";
import { selectAuthLoading, selectAuthError, selectAuthModal } from "../../features/auth/authSelectors";
import { hideAuthModal } from "../../features/auth/authSlice";
import Button from "../ui/Button";

const LoginForm = ({ onSuccessRedirect = "/vehicles" }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  const loading = useSelector(selectAuthLoading);
  const authError = useSelector(selectAuthError);
  const authModal = useSelector(selectAuthModal);

  const [emailOrUsername, setEmailOrUsername] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [validationError, setValidationError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    setValidationError("");

    if (!emailOrUsername.trim() || !password.trim()) {
      setValidationError("Please fill out all credentials.");
      return;
    }

    dispatch(loginStart());

    // Artificial timing delay for premium authenticating feedback
    setTimeout(() => {
      try {
        const payload = loginUserMock(emailOrUsername, password);
        dispatch(loginSuccess(payload));
        
        // If logged in inside intercept modal, fulfill dynamic pending actions
        if (authModal.isOpen) {
          const actionToResume = authModal.pendingAction;
          dispatch(hideAuthModal());
          if (actionToResume) {
            dispatch(actionToResume);
          }
        } else {
          navigate(onSuccessRedirect);
        }
      } catch (err) {
        dispatch(loginFailure(err.message || "Failed to authenticate."));
      }
    }, 1200);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Dynamic Validation Alerts */}
      {(validationError || authError) && (
        <div className="bg-red-500/10 border border-red-500/30 text-red-400 p-4 rounded-2xl text-xs font-medium tracking-wide">
          {validationError || authError}
        </div>
      )}

      {/* Email / Username field */}
      <div className="space-y-2">
        <label className="text-[9px] font-black tracking-widest text-white/40 uppercase">Email or Username</label>
        <div className="relative">
          <Mail size={14} className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30" />
          <input
            type="text"
            value={emailOrUsername}
            onChange={(e) => setEmailOrUsername(e.target.value)}
            disabled={loading}
            placeholder="demo@modgarage.com or ashutosh"
            className="w-full bg-white/[0.02] border border-white/10 rounded-2xl py-3.5 pl-11 pr-4 text-xs text-white placeholder-white/20 outline-none transition-all duration-300 focus:bg-white/[0.04] focus:border-white/30"
          />
        </div>
      </div>

      {/* Password field */}
      <div className="space-y-2">
        <div className="flex justify-between items-center">
          <label className="text-[9px] font-black tracking-widest text-white/40 uppercase">Password</label>
        </div>
        <div className="relative">
          <Lock size={14} className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30" />
          <input
            type={showPassword ? "text" : "password"}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            disabled={loading}
            placeholder="••••••••"
            className="w-full bg-white/[0.02] border border-white/10 rounded-2xl py-3.5 pl-11 pr-11 text-xs text-white placeholder-white/20 outline-none transition-all duration-300 focus:bg-white/[0.04] focus:border-white/30"
          />
          <button
            type="button"
            disabled={loading}
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-white/30 hover:text-white transition cursor-pointer"
          >
            {showPassword ? <EyeOff size={14} /> : <Eye size={14} />}
          </button>
        </div>
      </div>

      {/* Options Panel: Remember me */}
      <div className="flex items-center justify-between pt-1">
        <label className="flex items-center gap-2 cursor-pointer select-none">
          <input
            type="checkbox"
            checked={rememberMe}
            onChange={(e) => setRememberMe(e.target.checked)}
            disabled={loading}
            className="rounded border-white/10 bg-white/[0.02] text-white focus:ring-0 focus:ring-offset-0 h-3.5 w-3.5 outline-none cursor-pointer"
          />
          <span className="text-[9px] font-bold text-white/45 tracking-wider uppercase">Remember Me</span>
        </label>
      </div>

      {/* CTA Button */}
      <Button
        type="submit"
        disabled={loading}
        className="w-full !py-4 text-[10px] font-black tracking-[0.25em] bg-white text-black hover:bg-white/90 active:scale-[0.98] transition flex items-center justify-center gap-2"
      >
        {loading ? (
          <>
            AUTHENTICATING...
            <Loader2 size={12} className="animate-spin" />
          </>
        ) : (
          <>
            ENTER MODGARAGE
            <ArrowRight size={12} strokeWidth={2.5} />
          </>
        )}
      </Button>
    </form>
  );
};

export default LoginForm;
