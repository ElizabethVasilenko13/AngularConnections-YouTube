import { createFeatureSelector, createSelector } from "@ngrx/store";
import { UsersStateInterface } from "./users.interface";
import { Features } from "@store/features.enum";

export const usersFeatureSelector = createFeatureSelector<UsersStateInterface>(
  Features.Users,
);

export const isUsersLoadinSelector = createSelector(
  usersFeatureSelector,
  (state: UsersStateInterface) => state.isLoading,
);

export const usersSelector = createSelector(
  usersFeatureSelector,
  (state: UsersStateInterface) => state.users,
);

export const conversationsSelector = createSelector(
  usersFeatureSelector,
  (state: UsersStateInterface) => state.conversations,
);

export const companionsIDsSelector = createSelector(
  conversationsSelector,
  (conversations) => conversations?.items.map((conversation) => conversation.companionID.S),
);

