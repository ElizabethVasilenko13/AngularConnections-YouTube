import { createFeatureSelector, createSelector } from '@ngrx/store';
import { Features } from '@shared/enums/store-feautures.enum';
import { SignInStateInterface } from './signin.interface';

export const authFeatureSelector = createFeatureSelector<SignInStateInterface>(
  Features.SignIn,
);

export const isSubmittingSignInSelector = createSelector(
  authFeatureSelector,
  (state: SignInStateInterface) => state.isSubmitting,
);

export const backendSignInErrorSelector = createSelector(
  authFeatureSelector,
  (state: SignInStateInterface) => state.validationsError,
);

export const signInEmailSelector = createSelector(
  authFeatureSelector,
  (state: SignInStateInterface) => state.email,
);
