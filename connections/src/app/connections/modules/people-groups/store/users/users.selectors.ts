import { createFeatureSelector, createSelector } from "@ngrx/store";
import { UsersStateInterface } from "./users.interface";
import { Features } from "@store/features.enum";

export const usersFeatureSelector = createFeatureSelector<UsersStateInterface>(
  Features.Users,
);

export const isUsersLoadinSelector = createSelector(
  usersFeatureSelector,
  (state: UsersStateInterface) => state.isUsersLoading,
);

export const usersSelector = createSelector(
  usersFeatureSelector,
  (state: UsersStateInterface) => state.users,
);

// export const conversationsSelector = createSelector(
//   usersFeatureSelector,
//   (state: UsersStateInterface) => state.conversations,
// );

export const usersBackendSelector = createSelector(
  usersFeatureSelector,
  (state: UsersStateInterface) => state.backendUsersErrors,
);


// export const companionsIDsSelector = createSelector(
//   conversationsSelector,
//   (conversations) => conversations?.items.map((conversation) => conversation.companionID.S),
// );

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