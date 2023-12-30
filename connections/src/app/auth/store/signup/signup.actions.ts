import { createAction, props } from '@ngrx/store';
import { UserSignUpProps } from '../../models/auth.interfaces';
import { AuthError } from '@shared/types/user.interaces';

export const sighUpAction = createAction(
  '[Auth] Sign Up',
  props<{ userData: UserSignUpProps }>(),
);
export const sighUpSuccessAction = createAction('[Auth] Sign Up Success');
export const sighUpFailureAction = createAction(
  '[Auth] Sign Up Failure',
  props<{ error: AuthError }>(),
);

export const sighUpResetAction = createAction('[Auth] Sign Up Reset');
