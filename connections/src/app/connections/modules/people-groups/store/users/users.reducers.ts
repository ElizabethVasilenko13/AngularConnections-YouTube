import { Action, ActionReducer, createReducer, on } from "@ngrx/store";
import { UsersStateInterface } from "./users.interface";
import { createConversationAction, createConversationFailedAction, createConversationSuccessAction, loadConversationsAction, loadConversationsFailedAction, loadConversationsSuccessAction, loadUsersAction, loadUsersFailedAction, loadUsersSuccessAction } from "./users.actions";

const initialState: UsersStateInterface = {
  isLoading: false,
  backendErrors: null,
  users: null,
  conversations: null
};

const reducer = createReducer(
  initialState,
  on(loadUsersAction,
    loadConversationsAction,
    createConversationAction,
    (state): UsersStateInterface => ({
      ...state,
      isLoading: true,
      backendErrors: null,
    }),
  ),
  on(loadUsersSuccessAction,
    (state, action): UsersStateInterface => ({
      ...state,
      isLoading: false,
      backendErrors: null,
      users: action.users
    }),
  ),
  on(loadUsersFailedAction,
    loadConversationsFailedAction,
    createConversationFailedAction,
    (state, action): UsersStateInterface => ({
      ...state,
      isLoading: false,
      backendErrors: action.error,
    }),
  ),
  on(loadConversationsSuccessAction,
    (state, action): UsersStateInterface => ({
      ...state,
      isLoading: false,
      backendErrors: null,
      conversations: action.conversations
    }),
  ),
  on(createConversationSuccessAction,
    (state, action): UsersStateInterface => {
      const updatedConversations = state.conversations
      ? {
          ...state.conversations,
          items: [
            ...state.conversations.items,
            {
              id: { S: action.conversationId },
              companionID: { S: action.companion },
            },
          ],
        }
      : null;

      return {
        ...state,
        isLoading: false,
        backendErrors: null,
        conversations: updatedConversations
      }
    },
  )
)
export const usersReducer: ActionReducer<UsersStateInterface, Action> = (
  state,
  action,
) => reducer(state, action);