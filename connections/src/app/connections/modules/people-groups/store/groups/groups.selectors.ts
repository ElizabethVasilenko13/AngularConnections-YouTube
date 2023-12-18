import { createFeatureSelector, createSelector } from "@ngrx/store";
import { GroupsStateInterface } from "./groups.interface";
import { Features } from "@store/features.enum";
import { Group, GroupsProps } from "../../models/groups";

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

export const selectGroupById = createSelector(
  groupsSelector,
  (groups: GroupsProps | null, props: { itemId: string }) => {
    return groups?.items.find((group) => group.id.S === props.itemId) || null;
  }
);

export const backendGroupErrorSelector = createSelector(
  groupsFeatureSelector,
  (state: GroupsStateInterface) => state.backendErrors,
);