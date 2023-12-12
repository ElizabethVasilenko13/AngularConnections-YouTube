import { Action, ActionReducer, createReducer, on } from "@ngrx/store";
import {  AuthStateInterface } from "./auth.interface";
import { sighUpAction } from "./auth.actions";

const initialState: AuthStateInterface = {
  isSubmitting: false,
};

const reducer = createReducer(
  initialState,
  on(
    sighUpAction,
    (state): AuthStateInterface => (
      {
        ...state,
        isSubmitting: true
      }
    )
  ),
);
export const authReducer: ActionReducer<AuthStateInterface, Action> = (state, action) => reducer(state, action);