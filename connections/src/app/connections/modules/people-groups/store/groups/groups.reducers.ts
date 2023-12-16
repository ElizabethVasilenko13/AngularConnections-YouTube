import { Action, ActionReducer, createReducer, on } from "@ngrx/store";
import { GroupsStateInterface } from "./groups.interface";
import { loadGroupsAction, loadGroupsFailedAction, loadGroupsSuccessAction } from "./groups.actions";

const initialState: GroupsStateInterface = {
  isLoading: false,
  backendErrors: null,
  groups: null
};

const reducer = createReducer(
  initialState,
  on(loadGroupsAction,
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
    (state, action): GroupsStateInterface => ({
      ...state,
      isLoading: false,
      backendErrors: action.error,
    }),
  )
)
export const groupsReducer: ActionReducer<GroupsStateInterface, Action> = (
  state,
  action,
) => reducer(state, action);