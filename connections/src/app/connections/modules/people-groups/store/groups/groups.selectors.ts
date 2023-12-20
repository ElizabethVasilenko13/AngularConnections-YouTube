/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { createFeatureSelector, createSelector } from "@ngrx/store";
import { GroupsStateInterface } from "./groups.interface";
import { Features } from "@store/features.enum";
import { GroupProps } from "../../models/groups";

export const groupsFeatureSelector = createFeatureSelector<GroupsStateInterface>(
  Features.Groups,
);

export const isGroupsLoadinSelector = createSelector(
  groupsFeatureSelector,
  (state: GroupsStateInterface) => state.isLoading,
);

export const groupsSelector = createSelector(
  groupsFeatureSelector,
  (state: GroupsStateInterface) => state.groups,
);

export const groupsIdsSelector = createSelector(
  groupsSelector,
  (groups) => groups?.items.map((group) => group.id.S),
);

export const backendGroupErrorSelector = createSelector(
  groupsFeatureSelector,
  (state: GroupsStateInterface) => state.backendErrors,
);

export const loadedGroupsIdsSelector = createSelector(
  groupsFeatureSelector,
  (state: GroupsStateInterface) => state.loadedGroupIds
);

export const selectGroupById = (groupId: string) =>
  createSelector(
    groupsFeatureSelector,
    (state: GroupsStateInterface) => {
      if (state.groups && state.groups.items) {
        return state.groups.items.find((group: GroupProps) => group.id.S === groupId) || null;
      }
      return null;
    }
  );