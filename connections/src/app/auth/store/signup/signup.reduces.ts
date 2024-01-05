import { Action, ActionReducer, createReducer, on } from '@ngrx/store';
import { SignUpStateInterface } from './signup.interface';
import {
  sighUpAction,
  sighUpFailureAction,
  sighUpResetAction,
  sighUpSuccessAction,
} from './signup.actions';

const initialState: SignUpStateInterface = {
  isSubmitting: false,
  validationsError: null,
  email: '',
};

const reducer = createReducer(
  initialState,
  on(
    sighUpAction,
    (state, action): SignUpStateInterface => ({
      ...state,
      isSubmitting: true,
      validationsError: null,
      email: action.userData.email,
    }),
  ),
  on(
    sighUpSuccessAction,
    (state): SignUpStateInterface => ({
      ...state,
      isSubmitting: false,
    }),
  ),
  on(
    sighUpFailureAction,
    (state, action): SignUpStateInterface => ({
      ...state,
      isSubmitting: false,
      validationsError: action.error,
    }),
  ),
  on(
    sighUpResetAction,
    (state): SignUpStateInterface => ({
      ...state,
      isSubmitting: false,
      validationsError: null,
    }),
  ),
);
export const authReducer: ActionReducer<SignUpStateInterface, Action> = (state, action) =>
  reducer(state, action);
