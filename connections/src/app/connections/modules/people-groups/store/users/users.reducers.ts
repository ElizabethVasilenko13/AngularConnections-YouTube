import { Action, ActionReducer, createReducer, on } from "@ngrx/store";
import { UsersStateInterface } from "./users.interface";
import { createConversationAction, createConversationFailedAction, createConversationSuccessAction, loadConversationMessagesAction, loadConversationMessagesFailedAction, loadConversationMessagesSuccessAction, loadConversationsAction, loadConversationsFailedAction, loadConversationsSuccessAction, loadUsersAction, loadUsersFailedAction, loadUsersSuccessAction } from "./users.actions";

const initialState: UsersStateInterface = {
  isUsersLoading: false,
  isConverstionsLoading: false,
  backendUsersErrors: null,
  backendConverstionsErrors: null,
  users: null,
  loadedConversatonsIds: null
};

const reducer = createReducer(
  initialState,
  on(loadUsersAction,
    (state): UsersStateInterface => ({
      ...state,
      isUsersLoading: true,
      backendUsersErrors: null,
    }),
  ),
  on(loadUsersSuccessAction,
    (state, action): UsersStateInterface => ({
      ...state,
      isUsersLoading: false,
      backendUsersErrors: null,
      users: action.users
    }),
  ),
  on(loadUsersFailedAction,
    (state, action): UsersStateInterface => ({
      ...state,
      isUsersLoading: false,
      backendUsersErrors: action.error,
    }),
  ),
  on(
    loadConversationsAction,
    createConversationAction,
    loadConversationMessagesAction,
    (state): UsersStateInterface => ({
      ...state,
      isConverstionsLoading: true,
      backendUsersErrors: null,
    }),
  ),
  on(loadConversationsFailedAction,
    createConversationFailedAction,
    loadConversationMessagesFailedAction,
    (state, action): UsersStateInterface => ({
      ...state,
      isUsersLoading: false,
      backendConverstionsErrors: action.error
    }),
  ),
  on(loadConversationsSuccessAction, (state, action): UsersStateInterface => {
    const updatedUsers = (state.users?.items || []).map((user) => {
      const conversation = action.conversations.items.find((c) => user.uid.S === c.companionID.S);
      if (conversation) {
        return { ...user, conversatonID: conversation.id.S };
      }
      return user;
    });

    return {
      ...state,
      isUsersLoading: false,
      backendUsersErrors: null,
      backendConverstionsErrors: null,
      users: { items: updatedUsers || [], count: state.users?.count || '0' },
    };
  }),
  on(createConversationSuccessAction, (state, { companion, conversationId }): UsersStateInterface => {

    const updatedUsers = (state.users?.items || []).map((user) => {
      if (user.uid.S === companion) {
        return { ...user, conversatonID: conversationId };
      }
      return user;
    });

    return {
      ...state,
      isUsersLoading: false,
      backendUsersErrors: null,
      backendConverstionsErrors: null,
      users: { items: updatedUsers || [], count: state.users?.count || '0' },
    };
  }),
  on(loadConversationMessagesSuccessAction, (state, action): UsersStateInterface => {
console.log('succes');

    const updatedUsers = (state.users?.items || []).map((user) => {
      if (user.conversatonID === action.conversationData.conversationID) {
        return { ...user, messages: action.conversationData };
      }
      return user;
    });

    return {
      ...state,
      isUsersLoading: false,
      backendUsersErrors: null,
      backendConverstionsErrors: null,
      users: { items: updatedUsers || [], count: state.users?.count || '0' },
    };
  }),
)
export const usersReducer: ActionReducer<UsersStateInterface, Action> = (
  state,
  action,
) => reducer(state, action);