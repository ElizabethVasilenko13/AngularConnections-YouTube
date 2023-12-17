import { Action, ActionReducer, createReducer, on } from "@ngrx/store";
import { GroupsStateInterface } from "./groups.interface";
import { createGroupAction, createGroupFailedAction, createGroupSuccessAction, deleteGroupAction, deleteGroupFailedAction, deleteGroupSuccessAction, loadGroupsAction, loadGroupsFailedAction, loadGroupsSuccessAction } from "./groups.actions";

const initialState: GroupsStateInterface = {
  isLoading: false,
  backendErrors: null,
  groups: null
};

const reducer = createReducer(
  initialState,
  on(loadGroupsAction,
    createGroupAction,
    deleteGroupAction,
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
    deleteGroupFailedAction,
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
  on(deleteGroupSuccessAction,
    (state, action): GroupsStateInterface => {
    if (state.groups) {
      const updatedItems = state.groups.items.filter(
        (item) => item.id.S !== action.groupID
      );
      const updatedGroups = { ...state.groups, items: updatedItems };
      return {
        ...state,
        isLoading: false,
        backendErrors: null,
        groups: updatedGroups,
      };
    } else {
      return state;
    }
  })
)
export const groupsReducer: ActionReducer<GroupsStateInterface, Action> = (
  state,
  action,
) => reducer(state, action);