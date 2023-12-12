import { Action, ActionReducer, createReducer, on } from "@ngrx/store";
import {  AuthStateInterface } from "./auth.interface";
import { sighUpAction, sighUpFailureAction, sighUpSuccessAction } from "./auth.actions";

const initialState: AuthStateInterface = {
  isSubmitting: false,
  validationsError: null
};

const reducer = createReducer(
  initialState,
  on(
    sighUpAction,
    (state): AuthStateInterface => (
      {
        ...state,
        isSubmitting: true,
        validationsError: null
      }
    )
  ),
  on(sighUpSuccessAction,
    (state): AuthStateInterface => (
      {
        ...state,
        isSubmitting: false
      }
    )
  ),
  on(sighUpFailureAction,
    (state, action): AuthStateInterface => (
      {
        ...state,
        isSubmitting: false,
        validationsError: action.error
      }
    )
  )
);
export const authReducer: ActionReducer<AuthStateInterface, Action> = (state, action) => reducer(state, action);