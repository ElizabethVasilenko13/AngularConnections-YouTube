import { createFeatureSelector, createSelector } from "@ngrx/store";
import { GroupsStateInterface } from "./groups.interface";
import { Features } from "@store/features.enum";

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

export const backendGroupErrorSelector = createSelector(
  groupsFeatureSelector,
  (state: GroupsStateInterface) => state.backendErrors,
);