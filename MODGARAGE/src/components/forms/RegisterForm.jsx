import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { User, Lock, Mail, Tag, Eye, EyeOff, Loader2, ArrowRight } from "lucide-react";

import { registerStart, registerSuccess, registerFailure, hideAuthModal } from "../../features/auth/authSlice";
import { registerUserMock, checkPasswordStrength } from "../../features/auth/authUtils";
import { selectAuthLoading, selectAuthError, selectAuthModal } from "../../features/auth/authSelectors";
import Button from "../ui/Button";

const RegisterForm = ({ onSuccessRedirect = "/vehicles" }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const loading = useSelector(selectAuthLoading);
  const authError = useSelector(selectAuthError);
  const authModal = useSelector(selectAuthModal);

  const [fullName, setFullName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [validationError, setValidationError] = useState("");


  const pwdStrength = password ? checkPasswordStrength(password) : "weak";

  const handleSubmit = (e) => {
    e.preventDefault();
    setValidationError("");

    if (!fullName.trim() || !username.trim() || !email.trim() || !password.trim()) {
      setValidationError("Please fill out all credentials.");
      return;
    }

    if (password.length < 6) {
      setValidationError("Password must contain at least 6 characters.");
      return;
    }

    if (password !== confirmPassword) {
      setValidationError("Confirmation password does not match.");
      return;
    }

    dispatch(registerStart());

    // Artificial timing delay for premium authenticating feedback
    setTimeout(() => {
      try {
        const payload = registerUserMock(fullName, username, email, password);
        dispatch(registerSuccess(payload));
        
        // If registered inside intercept modal, fulfill dynamic pending actions
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
        dispatch(registerFailure(err.message || "Failed to register."));
      }
    }, 1200);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      
      {(validationError || authError) && (
        <div className="bg-red-500/10 border border-red-500/30 text-red-400 p-4 rounded-2xl text-xs font-medium tracking-wide">
          {validationError || authError}
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {/* Full Name field */}
        <div className="space-y-1.5">
          <label className="text-[9px] font-black tracking-widest text-white/40 uppercase">Full Name</label>
          <div className="relative">
            <User size={13} className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30" />
            <input
              type="text"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              disabled={loading}
              placeholder="Ashutosh Mishra"
              className="w-full bg-white/[0.02] border border-white/10 rounded-2xl py-3 pl-10 pr-4 text-xs text-white placeholder-white/20 outline-none transition-all duration-300 focus:bg-white/[0.04] focus:border-white/30"
            />
          </div>
        </div>

        {/* Username field */}
        <div className="space-y-1.5">
          <label className="text-[9px] font-black tracking-widest text-white/40 uppercase">Username</label>
          <div className="relative">
            <Tag size={13} className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30" />
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              disabled={loading}
              placeholder="ashutosh"
              className="w-full bg-white/[0.02] border border-white/10 rounded-2xl py-3 pl-10 pr-4 text-xs text-white placeholder-white/20 outline-none transition-all duration-300 focus:bg-white/[0.04] focus:border-white/30"
            />
          </div>
        </div>
      </div>

      {/* Email field */}
      <div className="space-y-1.5">
        <label className="text-[9px] font-black tracking-widest text-white/40 uppercase">Email Address</label>
        <div className="relative">
          <Mail size={13} className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30" />
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            disabled={loading}
            placeholder="tuner@modgarage.com"
            className="w-full bg-white/[0.02] border border-white/10 rounded-2xl py-3 pl-10 pr-4 text-xs text-white placeholder-white/20 outline-none transition-all duration-300 focus:bg-white/[0.04] focus:border-white/30"
          />
        </div>
      </div>

      {/* Password field */}
      <div className="space-y-1.5">
        <div className="flex justify-between items-center">
          <label className="text-[9px] font-black tracking-widest text-white/40 uppercase">Password</label>
          {password && (
            <span className={`text-[8px] font-black tracking-widest px-2 py-0.5 rounded uppercase ${
              pwdStrength === "strong" ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20" :
              pwdStrength === "medium" ? "bg-amber-500/10 text-amber-400 border border-amber-500/20" :
              "bg-red-500/10 text-red-400 border border-red-500/20"
            }`}>
              {pwdStrength} STRENGTH
            </span>
          )}
        </div>
        <div className="relative">
          <Lock size={13} className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30" />
          <input
            type={showPassword ? "text" : "password"}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            disabled={loading}
            placeholder="••••••••"
            className="w-full bg-white/[0.02] border border-white/10 rounded-2xl py-3 pl-10 pr-10 text-xs text-white placeholder-white/20 outline-none transition-all duration-300 focus:bg-white/[0.04] focus:border-white/30"
          />
          <button
            type="button"
            disabled={loading}
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-white/30 hover:text-white transition cursor-pointer"
          >
            {showPassword ? <EyeOff size={13} /> : <Eye size={13} />}
          </button>
        </div>
      </div>

      {/* Confirm Password field */}
      <div className="space-y-1.5">
        <label className="text-[9px] font-black tracking-widest text-white/40 uppercase">Confirm Password</label>
        <div className="relative">
          <Lock size={13} className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30" />
          <input
            type={showConfirmPassword ? "text" : "password"}
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            disabled={loading}
            placeholder="••••••••"
            className="w-full bg-white/[0.02] border border-white/10 rounded-2xl py-3 pl-10 pr-10 text-xs text-white placeholder-white/20 outline-none transition-all duration-300 focus:bg-white/[0.04] focus:border-white/30"
          />
          <button
            type="button"
            disabled={loading}
            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-white/30 hover:text-white transition cursor-pointer"
          >
            {showConfirmPassword ? <EyeOff size={13} /> : <Eye size={13} />}
          </button>
        </div>
      </div>

      {/* CTA Button */}
      <Button
        type="submit"
        disabled={loading}
        className="w-full !py-4 text-[10px] font-black tracking-[0.25em] bg-white text-black hover:bg-white/90 active:scale-[0.98] transition flex items-center justify-center gap-2 mt-2"
      >
        {loading ? (
          <>
            CREATING ACCOUNT...
            <Loader2 size={12} className="animate-spin" />
          </>
        ) : (
          <>
            REGISTER LICENCE
            <ArrowRight size={12} strokeWidth={2.5} />
          </>
        )}
      </Button>
    </form>
  );
};

export default RegisterForm;
