import { createAction, props } from "@ngrx/store";
import { AuthError } from "@shared/types/user";
import { UserProfileFormInterface } from "src/app/connections/models/user";

export const loadUserAction = createAction('[User] Load User');

export const loadUserSuccessfulAction = createAction(
  '[User] Load User Succeshul',
  props<UserProfileFormInterface>(),
);

export const loadUserFailedAction = createAction(
  '[User] Load User Failed',
  props<{ error: AuthError }>(),
);

export const UpdateUserNameAction = createAction(
  '[User] Update User Name',
  props<{ name: string }>(),
);

export const UpdateUserSuccessfulNameAction = createAction(
  '[User] Update User Name Successful',
  props<{ name: string }>(),
);

export const UpdateUserFailedNameAction = createAction(
  '[User] Update User Name Failed',
  props<{ error: AuthError }>(),
);