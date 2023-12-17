import { Action, ActionReducer, createReducer, on } from "@ngrx/store";
import { UsersStateInterface } from "./users.interface";
import { loadUsersAction, loadUsersFailedAction, loadUsersSuccessAction } from "./users.actions";

const initialState: UsersStateInterface = {
  isLoading: false,
  backendErrors: null,
  users: null
};

const reducer = createReducer(
  initialState,
  on(loadUsersAction,
    (state): UsersStateInterface => ({
      ...state,
      isLoading: true,
      backendErrors: null,
    }),
  ),
  on(loadUsersSuccessAction,
    (state, action): UsersStateInterface => ({
      ...state,
      isLoading: false,
      backendErrors: null,
      users: action.users
    }),
  ),
  on(loadUsersFailedAction,
    (state, action): UsersStateInterface => ({
      ...state,
      isLoading: false,
      backendErrors: action.error,
    }),
  ),
)
export const usersReducer: ActionReducer<UsersStateInterface, Action> = (
  state,
  action,
) => reducer(state, action);