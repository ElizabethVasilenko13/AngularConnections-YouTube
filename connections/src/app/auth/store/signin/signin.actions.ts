import { createAction, props } from "@ngrx/store";
import { UserSignInProps } from "../../models/auth";
import { AuthError } from "@shared/types/user";

export const sighInAction = createAction(
  '[Auth] Sign In',
  props<{ userData: UserSignInProps }>(),
);
export const sighInSuccessAction = createAction('[Auth] Sign In Success', props<{userData: UserSignInProps; token: string; uid: string}>());
export const sighInFailureAction = createAction(
  '[Auth] Sign In Failure',
  props<{ error: AuthError }>(),
);

export const sighInResetAction = createAction('[Auth] Sign In Reset');

