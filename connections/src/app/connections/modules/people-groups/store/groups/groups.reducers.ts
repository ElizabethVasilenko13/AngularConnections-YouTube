import { Action, ActionReducer, createReducer, on } from "@ngrx/store";
import { GroupsStateInterface } from "./groups.interface";
import { createGroupAction, createGroupFailedAction, createGroupSuccessAction, loadGroupsAction, loadGroupsFailedAction, loadGroupsSuccessAction } from "./groups.actions";

const initialState: GroupsStateInterface = {
  isLoading: false,
  backendErrors: null,
  groups: null
};

const reducer = createReducer(
  initialState,
  on(loadGroupsAction,
    createGroupAction,
    (state): GroupsStateInterface => ({
      ...state,
      isLoading: true,
      backendErrors: null,
    }),
  ),
  on(loadGroupsSuccessAction,
    (state, action): GroupsStateInterface => ({
      ...state,
      isLoading: false,
      backendErrors: null,
      groups: action.groups
    }),
  ),
  on(loadGroupsFailedAction,
    createGroupFailedAction,
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
            ...state.groups.items,
            {
              id: { S: action.groupID },
              name: { S: action.name },
              createdAt: { S: 'someValue' },
              createdBy: { S: action.userId },
            },
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
)
export const groupsReducer: ActionReducer<GroupsStateInterface, Action> = (
  state,
  action,
) => reducer(state, action);