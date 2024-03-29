import { Action, ActionReducer, createReducer, on } from '@ngrx/store';
import { UsersStateInterface } from './users.interface';
import {
  createConversationAction,
  createConversationFailedAction,
  createConversationSuccessAction,
  deleteConversationAction,
  deleteConversationFailedAction,
  deleteConversationSuccessAction,
  loadConversationMessagesSinceAction,
  loadConversationMessagesSinceFailedAction,
  loadConversationMessagesSinceSuccessAction,
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
  isAllConversationsLoading: false,
  isConversationLoading: false,
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
    (state): UsersStateInterface => ({
      ...state,
      isAllConversationsLoading: true,
      backendUsersErrors: null,
    }),
  ),
  on(
    createConversationAction,
    loadConversationMessagesSinceAction,
    deleteConversationAction,
    postConversationMessageAction,
    (state): UsersStateInterface => ({
      ...state,
      isConversationLoading: true,
      backendUsersErrors: null,
    }),
  ),
  on(
    loadConversationsFailedAction,
    (state, action): UsersStateInterface => ({
      ...state,
      isAllConversationsLoading: false,
      backendConverstionsErrors: action.error,
    }),
  ),
  on(
    createConversationFailedAction,
    loadConversationMessagesSinceFailedAction,
    deleteConversationFailedAction,
    postConversationMessageFailedAction,
    (state, action): UsersStateInterface => ({
      ...state,
      isConversationLoading: false,
      backendConverstionsErrors: action.error,
    }),
  ),
  on(loadConversationsSuccessAction, (state, action): UsersStateInterface => {
    const updatedUsers = (state.users?.items || []).map((user) => {
      const conversation = action.conversations.items.find(
        (conversation) => user.uid === conversation.companionID.S,
      );
      if (conversation) {
        return { ...user, conversatonID: conversation.id.S };
      }
      return user;
    });

    return {
      ...state,
      isAllConversationsLoading: false,
      backendUsersErrors: null,
      backendConverstionsErrors: null,
      users: { items: updatedUsers || [], count: state.users?.count || '0' },
    };
  }),
  on(
    createConversationSuccessAction,
    (state, { companion, conversationId }): UsersStateInterface => {
      const updatedUsers = (state.users?.items || []).map((user) => {
        if (user.uid === companion) {
          return { ...user, conversatonID: conversationId };
        }
        return user;
      });

      return {
        ...state,
        isConversationLoading: false,
        backendUsersErrors: null,
        backendConverstionsErrors: null,
        users: { items: updatedUsers || [], count: state.users?.count || '0' },
      };
    },
  ),
  on(loadConversationMessagesSinceSuccessAction, (state, action): UsersStateInterface => {
    const loadedConversatonsIds = state?.loadedConversatonsIds
      ? [...state.loadedConversatonsIds, action.conversationID]
      : [action.conversationID];
    const updatedUsers = (state.users?.items || []).map((user) => {
      if (user.conversatonID && user.conversatonID === action.conversationID) {
        return {
          ...user,
          messages: {
            count: user.messages?.count + action.conversationData.count,
            items: [...(user.messages?.items || []), ...action.conversationData.items],
          },
          lastUpdated: action.time,
        };
      }
      return user;
    });

    return {
      ...state,
      isConversationLoading: false,
      backendUsersErrors: null,
      backendConverstionsErrors: null,
      users: { items: updatedUsers, count: state.users?.count || '0' },
      loadedConversatonsIds,
    };
  }),
  on(deleteConversationSuccessAction, (state, action): UsersStateInterface => {
    const loadedConversatonsIds =
      state?.loadedConversatonsIds?.filter((id) => id !== action.conversationID) ?? null;
    const updatedUsers = (state.users?.items || []).map((user) => {
      if (user.conversatonID && user.conversatonID === action.conversationID) {
        return { ...user, messages: null, conversatonID: null, lastUpdated: null };
      }
      return user;
    });
    return {
      ...state,
      isConversationLoading: false,
      users: { items: updatedUsers, count: state.users?.count || '0' },
      loadedConversatonsIds,
    };
  }),
  on(
    postConversationMessageSuccessAction,
    (state): UsersStateInterface => ({
      ...state,
      isConversationLoading: false,
    }),
  ),
);
export const usersReducer: ActionReducer<UsersStateInterface, Action> = (state, action) =>
  reducer(state, action);
