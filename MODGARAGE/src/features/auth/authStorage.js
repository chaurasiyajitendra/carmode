// Centralized Storage Helper for Authentication
const AUTH_TOKEN_KEY = "modgarage_auth_token";
const AUTH_USER_KEY = "modgarage_auth_user";

export const authStorage = {
  saveSession: (user, token) => {
    try {
      localStorage.setItem(AUTH_TOKEN_KEY, token);
      localStorage.setItem(AUTH_USER_KEY, JSON.stringify(user));
    } catch (err) {
      console.error("Failed to save auth session:", err);
    }
  },

  clearSession: () => {
    try {
      localStorage.removeItem(AUTH_TOKEN_KEY);
      localStorage.removeItem(AUTH_USER_KEY);
    } catch (err) {
      console.error("Failed to clear auth session:", err);
    }
  },

  getSession: () => {
    try {
      const token = localStorage.getItem(AUTH_TOKEN_KEY);
      const userRaw = localStorage.getItem(AUTH_USER_KEY);
      if (!token || !userRaw) return { user: null, token: null };
      
      return {
        user: JSON.parse(userRaw),
        token
      };
    } catch (err) {
      console.error("Failed to retrieve auth session:", err);
      return { user: null, token: null };
    }
  }
};
