import { createAction, props } from "@ngrx/store";
import { AuthError } from "@shared/types/user";
import { ConverastionMessagesProps } from "../../models/conversation";

export const loadConversationMessagesAction = createAction('[Conversation] Load Conversation', props<{conversationID: string }>());

export const  loadConversationMessagesSuccessAction = createAction('[Conversation] Load Conversation Success', props<{ conversationData: ConverastionMessagesProps }>());
export const  loadConversationMessagesFailedAction = createAction(
  '[Conversation] Load Conversation Failed',
props<{ error: AuthError }>());

export const postConversationMessageAction = createAction('[Conversation] Post Message', props<{conversationID: string; message: string}>());

export const  postConversationMessageSuccessAction = createAction('[Conversation] Post Message Success');
export const  postConversationMessageFailedAction = createAction(
  '[Conversation] Post Message Failed',
props<{ error: AuthError }>());


export const deleteConversationAction = createAction('[Conversation] Delete Conversation', props<{ conversationID: string; redirect?: boolean }>());
export const deleteConversationSuccessAction = createAction('[Conversation] Delete Conversation Success', props<{ conversationID: string}>());
export const deleteConversationFailedAction = createAction(
  '[Conversation] Delete Conversation Failed',
props<{ error: AuthError }>());