import { createAction, props } from "@ngrx/store";
import { AuthError } from "@shared/types/user";
import { ConversationsProps, UsersProps } from "../../models/users";

export const loadUsersAction = createAction('[Users] Load Users', props<{ currentUserId: string }>());

export const loadUsersSuccessAction = createAction('[Users] Load Users Success', props<{ users: UsersProps; currentUserId: string }>());
export const loadUsersFailedAction = createAction(
  '[Users] Load Users Failed',
props<{ error: AuthError }>());

export const loadConversationsAction = createAction('[Users] Load Conversations');

export const loadConversationsSuccessAction = createAction('[Users] Load Conversations Success', props<{ conversations: ConversationsProps}>());
export const loadConversationsFailedAction = createAction(
  '[Users] Load Conversations Failed',
props<{ error: AuthError }>());