import { createAction, props } from "@ngrx/store";
import { UserAuthError, UserSignInProps } from "../../models/auth";

export const sighInAction = createAction(
  '[Auth] Sign In',
  props<{ userData: UserSignInProps }>(),
);
export const sighInSuccessAction = createAction('[Auth] Sign In Success', props<{userData: UserSignInProps; token: string; uid: string}>());
export const sighInFailureAction = createAction(
  '[Auth] Sign In Failure',
  props<{ error: UserAuthError }>(),
);

export const sighInResetAction = createAction('[Auth] Sign In Reset');

