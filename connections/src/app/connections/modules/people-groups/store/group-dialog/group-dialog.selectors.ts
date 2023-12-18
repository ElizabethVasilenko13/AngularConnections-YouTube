import { createFeatureSelector, createSelector } from "@ngrx/store";
import { GroupDialogStateInterface } from "./group-dialog.interface";
import { Features } from "@store/features.enum";

export const groupDialogFeatureSelector = createFeatureSelector<GroupDialogStateInterface>(
  Features.GroupDialog,
);

export const isGroupDialogLoadinSelector = createSelector(
  groupDialogFeatureSelector,
  (state: GroupDialogStateInterface) => state.isLoading,
);

export const groupMessagesSelector = createSelector(
  groupDialogFeatureSelector,
  (state: GroupDialogStateInterface) => state.messages,
);

export const groupMessagesAuthorsIdsSelector = createSelector(
  groupMessagesSelector,
  (messages) => messages?.items.map((conversation) => conversation.authorID.S),
);

export const loadedGroupsIdsSelector = createSelector(
  groupDialogFeatureSelector,
  (state: GroupDialogStateInterface) => state.loadedGroupIds
);

export const backendGroupDialogErrorSelector = createSelector(
  groupDialogFeatureSelector,
  (state: GroupDialogStateInterface) => state.backendErrors,
);

// export const groupAuthorIdsSelector = createSelector(
//   groupMessagesSelector,
//   (messages) => messages?.items.,
// );