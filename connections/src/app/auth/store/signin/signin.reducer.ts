import { Action, ActionReducer, createReducer, on } from '@ngrx/store';
import { SignInStateInterface } from './signin.interface';
import {
  sighInAction,
  sighInFailureAction,
  sighInResetAction,
  sighInSuccessAction,
} from './signin.actions';

const initialState: SignInStateInterface = {
  isSubmitting: false,
  validationsError: null,
  email: '',
  token: null,
  uid: null,
};

const reducer = createReducer(
  initialState,
  on(
    sighInAction,
    (state, action): SignInStateInterface => ({
      ...state,
      isSubmitting: true,
      validationsError: null,
      email: action.userData.email,
    }),
  ),
  on(
    sighInSuccessAction,
    (state, { userData, token, uid }): SignInStateInterface => ({
      ...state,
      isSubmitting: false,
      token,
      uid,
      email: userData.email,
    }),
  ),
  on(
    sighInFailureAction,
    (state, action): SignInStateInterface => ({
      ...state,
      isSubmitting: false,
      validationsError: action.error,
    }),
  ),
  on(
    sighInResetAction,
    (state): SignInStateInterface => ({
      ...state,
      isSubmitting: false,
      validationsError: null,
    }),
  ),
);
export const signinReducer: ActionReducer<SignInStateInterface, Action> = (
  state,
  action,
) => reducer(state, action);
