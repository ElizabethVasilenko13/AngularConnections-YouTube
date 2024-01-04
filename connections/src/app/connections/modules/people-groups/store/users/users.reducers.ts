import { Action, ActionReducer, createReducer, on } from '@ngrx/store';
import { UsersStateInterface } from './users.interface';
import {
  createConversationAction,
  createConversationFailedAction,
  createConversationSuccessAction,
  deleteConversationAction,
  deleteConversationFailedAction,
  deleteConversationSuccessAction,
  loadConversationMessagesAction,
  loadConversationMessagesFailedAction,
  loadConversationMessagesSinceAction,
  loadConversationMessagesSinceFailedAction,
  loadConversationMessagesSinceSuccessAction,
  loadConversationMessagesSuccessAction,
  loadConversationsAction,
  loadConversationsFailedAction,
  loadConversationsSuccessAction,
  loadUsersAction,
  loadUsersFailedAction,
  loadUsersSuccessAction,
  postConversationMessageAction,
  postConversationMessageFailedAction,
  postConversationMessageSuccessAction,
} from './users.actions';

const initialState: UsersStateInterface = {
  isUsersLoading: false,
  isConverstionsLoading: false,
  backendUsersErrors: null,
  backendConverstionsErrors: null,
  users: null,
  loadedConversatonsIds: null,
};

const reducer = createReducer(
  initialState,
  on(
    loadUsersAction,
    (state): UsersStateInterface => ({
      ...state,
      isUsersLoading: true,
      backendUsersErrors: null,
    }),
  ),
  on(
    loadUsersSuccessAction,
    (state, action): UsersStateInterface => ({
      ...state,
      isUsersLoading: false,
      backendUsersErrors: null,
      users: action.users,
    }),
  ),
  on(
    loadUsersFailedAction,
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
    loadConversationMessagesSinceAction,
    deleteConversationAction,
    postConversationMessageAction,
    (state): UsersStateInterface => ({
      ...state,
      isConverstionsLoading: true,
      backendUsersErrors: null,
    }),
  ),
  on(
    loadConversationsFailedAction,
    createConversationFailedAction,
    loadConversationMessagesFailedAction,
    loadConversationMessagesSinceFailedAction,
    deleteConversationFailedAction,
    postConversationMessageFailedAction,
    (state, action): UsersStateInterface => ({
      ...state,
      isUsersLoading: false,
      isConverstionsLoading: false,
      backendConverstionsErrors: action.error,
    }),
  ),
  on(loadConversationsSuccessAction, (state, action): UsersStateInterface => {
    const updatedUsers = (state.users?.items || []).map((user) => {
      const conversation = action.conversations.items.find(
        (conversation) => user.uid.S === conversation.companionID.S,
      );
      if (conversation) {
        return { ...user, conversatonID: conversation.id.S };
      }
      return user;
    });

    return {
      ...state,
      isUsersLoading: false,
      isConverstionsLoading: false,
      backendUsersErrors: null,
      backendConverstionsErrors: null,
      users: { items: updatedUsers || [], count: state.users?.count || '0' },
    };
  }),
  on(
    createConversationSuccessAction,
    (state, { companion, conversationId }): UsersStateInterface => {
      const updatedUsers = (state.users?.items || []).map((user) => {
        if (user.uid.S === companion) {
          return { ...user, conversatonID: conversationId };
        }
        return user;
      });

      return {
        ...state,
        isUsersLoading: false,
        isConverstionsLoading: false,
        backendUsersErrors: null,
        backendConverstionsErrors: null,
        users: { items: updatedUsers || [], count: state.users?.count || '0' },
      };
    },
  ),
  on(
    loadConversationMessagesSuccessAction,
    (state, action): UsersStateInterface => {
      const loadedConversatonsIds = state?.loadedConversatonsIds
        ? [...state.loadedConversatonsIds, action.conversationID]
        : [action.conversationID];
      const updatedUsers = (state.users?.items || []).map((user) => {
        if (
          user.conversatonID &&
          user.conversatonID === action.conversationID
        ) {
          return {
            ...user,
            messages: action.conversationData,
            lastUpdated: action.time,
          };
        }
        return user;
      });

      return {
        ...state,
        isUsersLoading: false,
        isConverstionsLoading: false,
        backendUsersErrors: null,
        backendConverstionsErrors: null,
        users: { items: updatedUsers, count: state.users?.count || '0' },
        loadedConversatonsIds,
      };
    },
  ),
  on(
    loadConversationMessagesSinceSuccessAction,
    (state, action): UsersStateInterface => {
      const loadedConversatonsIds = state?.loadedConversatonsIds
        ? [...state.loadedConversatonsIds, action.conversationID]
        : [action.conversationID];
      const updatedUsers = (state.users?.items || []).map((user) => {
        if (
          user.conversatonID &&
          user.conversatonID === action.conversationID
        ) {
          return {
            ...user,
            messages: {
              count: user.messages?.count + action.conversationData.count,
              items: [
                ...(user.messages?.items || []),
                ...action.conversationData.items,
              ],
            },
            lastUpdated: action.time,
          };
        }
        return user;
      });

      return {
        ...state,
        isUsersLoading: false,
        isConverstionsLoading: false,
        backendUsersErrors: null,
        backendConverstionsErrors: null,
        users: { items: updatedUsers, count: state.users?.count || '0' },
        loadedConversatonsIds,
      };
    },
  ),
  on(deleteConversationSuccessAction, (state, action): UsersStateInterface => {
    const loadedConversatonsIds =
      state?.loadedConversatonsIds?.filter(
        (id) => id !== action.conversationID,
      ) ?? null;
    const updatedUsers = (state.users?.items || []).map((user) => {
      if (user.conversatonID && user.conversatonID === action.conversationID) {
        return { ...user, messages: null, conversatonID: null };
      }
      return user;
    });
    return {
      ...state,
      isConverstionsLoading: false,
      users: { items: updatedUsers, count: state.users?.count || '0' },
      loadedConversatonsIds,
    };
  }),
  on(
    postConversationMessageSuccessAction,
    (state): UsersStateInterface => ({
      ...state,
      isConverstionsLoading: false,
    }),
  ),
);
export const usersReducer: ActionReducer<UsersStateInterface, Action> = (
  state,
  action,
) => reducer(state, action);
