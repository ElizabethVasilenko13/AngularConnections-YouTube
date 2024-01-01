import { Action, ActionReducer, createReducer, on } from '@ngrx/store';
import { UserStateInterface } from './user.interface';
import {
  LOGOUTSUCCESS,
  LogoutAction,
  LogoutFailedAction,
  LogoutSuccessfulAction,
  UpdateUserFailedNameAction,
  UpdateUserNameAction,
  UpdateUserSuccessfulNameAction,
  loadUserAction,
  loadUserFailedAction,
  loadUserSuccessfulAction,
} from './user.actions';

const initialState: UserStateInterface = {
  isLoading: false,
  backendErrors: null,
  userData: null,
};

const reducer = createReducer(
  initialState,
  on(
    loadUserAction,
    UpdateUserNameAction,
    LogoutAction,
    (state): UserStateInterface => ({
      ...state,
      isLoading: true,
      backendErrors: null,
    }),
  ),
  on(
    loadUserSuccessfulAction,
    (state, action): UserStateInterface => ({
      ...state,
      isLoading: false,
      backendErrors: null,
      userData: {
        uid: action.uid,
        email: action.email,
        createdAt: action.createdAt,
        name: action.name,
      },
    }),
  ),
  on(
    loadUserFailedAction,
    (state, { error }): UserStateInterface => ({
      ...state,
      isLoading: false,
      backendErrors: error,
    }),
  ),
  on(UpdateUserSuccessfulNameAction, (state, action): UserStateInterface => {
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
  }),
  on(
    UpdateUserFailedNameAction,
    (state, { error }): UserStateInterface => ({
      ...state,
      isLoading: false,
      backendErrors: error,
    }),
  ),
  on(
    LogoutSuccessfulAction,
    (state): UserStateInterface => ({
      ...state,
      isLoading: false,
      backendErrors: null,
      userData: null,
    }),
  ),
  on(
    LogoutFailedAction,
    (state, { error }): UserStateInterface => ({
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

// eslint-disable-next-line @typescript-eslint/ban-types
export function clearStateMetaReducer<State extends {}>(
  reducer: ActionReducer<State, Action>,
): ActionReducer<State, Action> {
  return function clearStateFn(state: State | undefined, action: Action) {
    if (action.type === LOGOUTSUCCESS) {
      state = {} as State;
    }
    return reducer(state, action);
  };
}
