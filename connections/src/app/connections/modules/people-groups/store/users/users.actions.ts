import { createAction, props } from "@ngrx/store";
import { AuthError } from "@shared/types/user";
import { ConversationsProps, UsersProps } from "../../models/users";
import { ConverastionMessagesProps } from "../../models/conversation";

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

export const createConversationAction = createAction('[Users] Create Conversation', props<{companion: string}>());

export const createConversationSuccessAction = createAction('[Users] Create Conversation Success', props<{companion: string; conversationId: string}>());
export const createConversationFailedAction = createAction(
  '[Users] Create Conversation Failed',
props<{ error: AuthError }>());

export const loadConversationMessagesAction = createAction('[Users] Load Conversation', props<{conversationID: string }>());

export const  loadConversationMessagesSuccessAction = createAction('[Users] Load Conversation Success', props<{ conversationData: ConverastionMessagesProps; conversationID: string  }>());
export const  loadConversationMessagesFailedAction = createAction(
  '[Users] Load Conversation Failed',
props<{ error: AuthError }>());