import { Action, ActionReducer, createReducer, on } from '@ngrx/store';
import { GroupsStateInterface } from './groups.interface';
import {
  createGroupAction,
  createGroupFailedAction,
  createGroupSuccessAction,
  deleteGroupAction,
  deleteGroupFailedAction,
  deleteGroupSuccessAction,
  loadGroupMessagesSinceAction,
  loadGroupMessagesSinceFailedAction,
  loadGroupMessagesSinceSuccessAction,
  loadGroupsAction,
  loadGroupsFailedAction,
  loadGroupsSuccessAction,
  postNewMessageAction,
  postNewMessageFailedAction,
} from './groups.actions';

const initialState: GroupsStateInterface = {
  isLoading: false,
  backendErrors: null,
  groups: null,
  loadedGroupIds: null,
};

const reducer = createReducer(
  initialState,
  on(
    loadGroupsAction,
    createGroupAction,
    deleteGroupAction,
    postNewMessageAction,
    loadGroupMessagesSinceAction,
    postNewMessageAction,
    loadGroupMessagesSinceAction,
    (state): GroupsStateInterface => ({
      ...state,
      isLoading: true,
      backendErrors: null,
    }),
  ),
  on(
    loadGroupsSuccessAction,
    (state, action): GroupsStateInterface => ({
      ...state,
      isLoading: false,
      backendErrors: null,
      groups: action.groups,
    }),
  ),
  on(loadGroupMessagesSinceSuccessAction, (state, action): GroupsStateInterface => {
    const updatedGroups = (state.groups?.items || []).map((group) =>
      group.id === action.groupID
        ? {
            ...group,
            messages: {
              count: action.groupData.count,
              items: [...(group.messages?.items || []), ...action.groupData.items],
            },
            lastUpdated: action.time,
          }
        : group,
    );
    return {
      ...state,
      groups: {
        ...state.groups,
        items: updatedGroups,
      },
      isLoading: false,
      backendErrors: null,
    };
  }),
  on(
    loadGroupsFailedAction,
    createGroupFailedAction,
    deleteGroupFailedAction,
    postNewMessageFailedAction,
    loadGroupMessagesSinceFailedAction,
    postNewMessageFailedAction,
    loadGroupMessagesSinceFailedAction,
    (state, action): GroupsStateInterface => ({
      ...state,
      isLoading: false,
      backendErrors: action.error,
    }),
  ),
  on(createGroupSuccessAction, (state, action): GroupsStateInterface => {
    const updatedGroups = state.groups
      ? {
          ...state.groups,
          items: [
            {
              id: action.groupID,
              name: action.name ,
              createdAt: String(new Date().getTime()),
              createdBy: action.userId,
            },
            ...state.groups.items,
          ],
        }
      : null;

    return {
      ...state,
      isLoading: false,
      backendErrors: null,
      groups: updatedGroups,
    };
  }),
  on(deleteGroupSuccessAction, (state, action): GroupsStateInterface => {
    if (state.groups) {
      const updatedItems = state.groups.items.filter((item) => item.id !== action.groupID);
      const loadedGroupIds = state?.loadedGroupIds?.filter((id) => id !== action.groupID) ?? null;
      const updatedGroups = { ...state.groups, items: updatedItems };
      return {
        ...state,
        isLoading: false,
        backendErrors: null,
        groups: updatedGroups,
        loadedGroupIds,
      };
    } else {
      return state;
    }
  }),
);
export const groupsReducer: ActionReducer<GroupsStateInterface, Action> = (state, action) =>
  reducer(state, action);
