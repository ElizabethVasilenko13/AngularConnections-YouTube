import { Action, ActionReducer, createReducer, on } from "@ngrx/store";
import { UsersStateInterface } from "./users.interface";
import { loadConversationsAction, loadConversationsFailedAction, loadConversationsSuccessAction, loadUsersAction, loadUsersFailedAction, loadUsersSuccessAction } from "./users.actions";

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
  )
)
export const usersReducer: ActionReducer<UsersStateInterface, Action> = (
  state,
  action,
) => reducer(state, action);