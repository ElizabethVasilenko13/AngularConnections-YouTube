import { createAction, props } from "@ngrx/store";
import { AuthError } from "@shared/types/user";
import { UsersProps } from "../../models/users";

export const loadUsersAction = createAction('[Users] Load Users', props<{ currentUserId: string }>());

export const loadUsersSuccessAction = createAction('[Users] Load Users Success', props<{ users: UsersProps; currentUserId: string }>());
export const loadUsersFailedAction = createAction(
  '[Users] Load Users Failed',
props<{ error: AuthError }>());