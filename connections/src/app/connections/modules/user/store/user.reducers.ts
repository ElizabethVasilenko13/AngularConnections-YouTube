import { Action, ActionReducer, createReducer, on } from "@ngrx/store";
import { UserStateInterface } from "./user.interface";
import { UpdateUserNameAction, UpdateUserSuccessfulNameAction, loadUserAction, loadUserFailedAction, loadUserSuccessfulAction } from "./user.actions";

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
  on(
    UpdateUserNameAction,
    (state): UserStateInterface => ({
      ...state,
      isLoading: true,
      backendErrors: null
    }),
  ),
  on(
    UpdateUserSuccessfulNameAction,
    (state, action): UserStateInterface => {
      const updatedUserData = {
        name: action.name,
        uid: state.userData?.uid || '',
        email: state.userData?.email || '',
        createdAt: state.userData?.createdAt || '',
      };

      return {
        ...state,
        isLoading: false,
        backendErrors: null,
        userData: updatedUserData,
      };
    },
  ),
);
export const userReducer: ActionReducer<UserStateInterface, Action> = (
  state,
  action,
) => reducer(state, action);