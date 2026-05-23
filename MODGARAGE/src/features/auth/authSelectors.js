import { createSelector } from "@reduxjs/toolkit";

export const selectAuthState = (state) => state.auth;

export const selectIsAuthenticated = createSelector(
  [selectAuthState],
  (auth) => auth.isAuthenticated
);

export const selectAuthUser = createSelector(
  [selectAuthState],
  (auth) => auth.user
);

export const selectAuthToken = createSelector(
  [selectAuthState],
  (auth) => auth.token
);

export const selectAuthLoading = createSelector(
  [selectAuthState],
  (auth) => auth.loading
);

export const selectAuthError = createSelector(
  [selectAuthState],
  (auth) => auth.error
);

export const selectAuthModal = createSelector(
  [selectAuthState],
  (auth) => auth.authModal
);
