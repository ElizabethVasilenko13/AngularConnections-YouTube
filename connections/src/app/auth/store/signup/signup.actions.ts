import { createAction, props } from '@ngrx/store';
import { UserAuthError, UserSignUpProps } from '../../models/auth';

export const sighUpAction = createAction(
  '[Auth] Sign Up',
  props<{ userData: UserSignUpProps }>(),
);
export const sighUpSuccessAction = createAction('[Auth] Sign Up Success');
export const sighUpFailureAction = createAction(
  '[Auth] Sign Up Failure',
  props<{ error: UserAuthError }>(),
);
