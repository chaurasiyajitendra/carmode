import { createSlice } from "@reduxjs/toolkit";
import { authStorage } from "./authStorage";

const initialState = {
  user: null,
  isAuthenticated: false,
  token: null,
  loading: false,
  error: null,
  authModal: {
    isOpen: false,
    message: "",
    pendingAction: null
  }
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loginStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    
    loginSuccess: (state, action) => {
      const { user, token } = action.payload;
      state.user = user;
      state.token = token;
      state.isAuthenticated = true;
      state.loading = false;
      state.error = null;
      authStorage.saveSession(user, token);
    },
    
    loginFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    
    registerStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    
    registerSuccess: (state, action) => {
      const { user, token } = action.payload;
      state.user = user;
      state.token = token;
      state.isAuthenticated = true;
      state.loading = false;
      state.error = null;
      authStorage.saveSession(user, token);
    },
    
    registerFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.isAuthenticated = false;
      state.loading = false;
      state.error = null;
      state.authModal = { isOpen: false, message: "", pendingAction: null };
      authStorage.clearSession();
    },
    
    restoreSession: (state, action) => {
      const { user, token } = action.payload;
      if (user && token) {
        state.user = user;
        state.token = token;
        state.isAuthenticated = true;
      }
    },
    
    showAuthModal: (state, action) => {
      const { message, pendingAction } = action.payload;
      state.authModal.isOpen = true;
      state.authModal.message = message || "Login Required to access your MODGARAGE profile";
      state.authModal.pendingAction = pendingAction || null;
    },
    
    hideAuthModal: (state) => {
      state.authModal.isOpen = false;
      state.authModal.message = "";
      state.authModal.pendingAction = null;
    },
    
    clearAuthError: (state) => {
      state.error = null;
    }
  }
});

export const {
  loginStart,
  loginSuccess,
  loginFailure,
  registerStart,
  registerSuccess,
  registerFailure,
  logout,
  restoreSession,
  showAuthModal,
  hideAuthModal,
  clearAuthError
} = authSlice.actions;

export default authSlice.reducer;
