import { showAuthModal } from "./authSlice";

// Custom Redux Middleware to intercept premium actions and guard them with auth redirects
export const authMiddleware = (store) => (next) => (action) => {
  const protectedActions = [
    "customization/toggleFavorite",
    "customization/addToCompare",
    "customization/saveBuild"
  ];

  if (protectedActions.includes(action.type)) {
    const state = store.getState();
    const { isAuthenticated } = state.auth;

    if (!isAuthenticated) {
      let actionLabel = "access premium features";
      if (action.type === "customization/toggleFavorite") actionLabel = "bookmark vehicles to your favorites";
      if (action.type === "customization/addToCompare") actionLabel = "add vehicles to your compare matrix";
      if (action.type === "customization/saveBuild") actionLabel = "save custom specifications to your garage";

      // Stop action from hitting reducer and dispatch showAuthModal
      store.dispatch(
        showAuthModal({
          message: `Login Required to ${actionLabel} and access your MODGARAGE profile.`,
          pendingAction: action
        })
      );
      return; 
    }
  }

  return next(action);
};
