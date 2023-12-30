import { createFeatureSelector, createSelector } from "@ngrx/store";
import { UsersStateInterface } from "./users.interface";
import { Features } from "@shared/enums/store-feautures.enum";

export const usersFeatureSelector = createFeatureSelector<UsersStateInterface>(
  Features.Users,
);

export const isUsersLoadinSelector = createSelector(
  usersFeatureSelector,
  (state: UsersStateInterface) => state.isUsersLoading,
);

export const isConversationLoadinSelector = createSelector(
  usersFeatureSelector,
  (state: UsersStateInterface) => state.isConverstionsLoading,
);

export const usersSelector = createSelector(
  usersFeatureSelector,
  (state: UsersStateInterface) => state.users,
);

export const usersBackendSelector = createSelector(
  usersFeatureSelector,
  (state: UsersStateInterface) => state.backendUsersErrors,
);

export const conversationBackendSelector = createSelector(
  usersFeatureSelector,
  (state: UsersStateInterface) => state.backendConverstionsErrors,
);

export const loadedConverationsIdsSelector = createSelector(
  usersFeatureSelector,
  (state: UsersStateInterface) => state.loadedConversatonsIds,
);


// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export const selectConversationById = (conversationID: string) =>
  createSelector(
    usersFeatureSelector,
    (state: UsersStateInterface) => {
      if (state.users && state.users.items) {
        return state.users.items.find((user) => user.conversatonID === conversationID) || null;
      }
      return null;
    }
  );