import { Action, ActionReducer, createReducer, on } from "@ngrx/store";
import { UserStateInterface } from "./user.interface";
import { loadUserAction, loadUserFailedAction, loadUserSuccessfulAction } from "./user.actions";

const initialState: UserStateInterface = {
  isLoading: false,
  backendErrors: null,
  userData: null
};

const reducer = createReducer(
  initialState,
  on(
    loadUserAction,
    (state): UserStateInterface => ({
      ...state,
      isLoading: true,
      backendErrors: null
    }),
  ),
  on(loadUserSuccessfulAction,
    (state, action): UserStateInterface => ({
      ...state,
      isLoading: false,
      backendErrors: null,
      userData: {
        uid: action.uid,
        email: action.email,
        createdAt: action.createdAt,
        name: action.name
      }
    }),
  ),
  on(loadUserFailedAction,
    (state, {error}): UserStateInterface => ({
      ...state,
      isLoading: false,
      backendErrors: error,
    }),
  ),

);
export const userReducer: ActionReducer<UserStateInterface, Action> = (
  state,
  action,
) => reducer(state, action);