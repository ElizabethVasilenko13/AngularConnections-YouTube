import { createAction, props } from '@ngrx/store';
import { AuthError } from '@shared/types/user.interaces';
import { ConverastionMessagesProps, ConversationsProps, UsersProps } from '../../models/users';

export const loadUsersAction = createAction(
  '[Users] Load Users',
  props<{ currentUserId: string }>(),
);
export const loadUsersSuccessAction = createAction(
  '[Users] Load Users Success',
  props<{ users: UsersProps; currentUserId: string }>(),
);
export const loadUsersFailedAction = createAction(
  '[Users] Load Users Failed',
  props<{ error: AuthError }>(),
);

export const loadConversationsAction = createAction('[Users] Load Conversations');
export const loadConversationsSuccessAction = createAction(
  '[Users] Load Conversations Success',
  props<{ conversations: ConversationsProps }>(),
);
export const loadConversationsFailedAction = createAction(
  '[Users] Load Conversations Failed',
  props<{ error: AuthError }>(),
);

export const createConversationAction = createAction(
  '[Conversation] Create Conversation',
  props<{ companion: string }>(),
);
export const createConversationSuccessAction = createAction(
  '[Conversation] Create Conversation Success',
  props<{ companion: string; conversationId: string }>(),
);
export const createConversationFailedAction = createAction(
  '[Conversation] Create Conversation Failed',
  props<{ error: AuthError }>(),
);

export const loadConversationMessagesAction = createAction(
  '[Conversation] Load Conversation',
  props<{ conversationID: string }>(),
);
export const loadConversationMessagesSuccessAction = createAction(
  '[Conversation] Load Conversation Success',
  props<{
    conversationData: ConverastionMessagesProps;
    time: number;
    conversationID: string;
  }>(),
);
export const loadConversationMessagesFailedAction = createAction(
  '[Conversation] Load Conversation Failed',
  props<{ error: AuthError }>(),
);

export const loadConversationMessagesSinceAction = createAction(
  '[Conversation] Load Conversation Since',
  props<{ conversationID: string; time: number }>(),
);
export const loadConversationMessagesSinceSuccessAction = createAction(
  '[Conversation] Load Conversation Success Since',
  props<{
    conversationData: ConverastionMessagesProps;
    time: number;
    conversationID: string;
  }>(),
);
export const loadConversationMessagesSinceFailedAction = createAction(
  '[Conversation] Load Conversation Since Failed',
  props<{ error: AuthError }>(),
);

export const deleteConversationAction = createAction(
  '[Conversation] Delete Conversation',
  props<{ conversationID: string; redirect?: boolean }>(),
);
export const deleteConversationSuccessAction = createAction(
  '[Conversation] Delete Conversation Success',
  props<{ conversationID: string }>(),
);
export const deleteConversationFailedAction = createAction(
  '[Conversation] Delete Conversation Failed',
  props<{ error: AuthError }>(),
);

export const postConversationMessageAction = createAction(
  '[Conversation] Post Message',
  props<{ conversationID: string; message: string; time: number }>(),
);
export const postConversationMessageSuccessAction = createAction(
  '[Conversation] Post Message Success',
);
export const postConversationMessageFailedAction = createAction(
  '[Conversation] Post Message Failed',
  props<{ error: AuthError }>(),
);
