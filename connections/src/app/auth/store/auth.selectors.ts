import { createFeatureSelector, createSelector } from "@ngrx/store";
import { Features } from "@store/features.enum";
import { AuthStateInterface } from "./auth.interface";

export const authFeatureSelector = createFeatureSelector<AuthStateInterface>(Features.Auth);

export const isSubmittingSelector = createSelector(
  authFeatureSelector,
  (state: AuthStateInterface) => state.isSubmitting
);

export const backendErrorSelector = createSelector(
  authFeatureSelector,
  (state: AuthStateInterface) => state.validationsError
);


