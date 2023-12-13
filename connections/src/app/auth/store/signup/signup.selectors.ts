import { createFeatureSelector, createSelector } from '@ngrx/store';
import { Features } from '@store/features.enum';
import { SignUpStateInterface } from './signup.interface';

export const authFeatureSelector = createFeatureSelector<SignUpStateInterface>(
  Features.SignUp,
);

export const isSubmittingSelector = createSelector(
  authFeatureSelector,
  (state: SignUpStateInterface) => state.isSubmitting,
);

export const backendErrorSelector = createSelector(
  authFeatureSelector,
  (state: SignUpStateInterface) => state.validationsError,
);

export const authEmailSelector = createSelector(
  authFeatureSelector,
  (state: SignUpStateInterface) => state.email,
);
