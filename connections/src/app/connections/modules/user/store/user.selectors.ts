import { createFeatureSelector, createSelector } from '@ngrx/store';
import { Features } from '@shared/enums/store-feautures.enum';
import { UserStateInterface } from './user.interface';

export const authFeatureSelector = createFeatureSelector<UserStateInterface>(Features.User);

export const isUserLoadinSgelector = createSelector(
  authFeatureSelector,
  (state: UserStateInterface) => state.isLoading,
);

export const userSelector = createSelector(
  authFeatureSelector,
  (state: UserStateInterface) => state.userData,
);

export const userEmailSelector = createSelector(
  authFeatureSelector,
  (state: UserStateInterface) => state.userData?.email,
);
