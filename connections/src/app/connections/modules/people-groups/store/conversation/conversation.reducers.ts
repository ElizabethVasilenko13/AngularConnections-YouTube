import { Action, ActionReducer, createReducer, on } from "@ngrx/store";
import { ConversationStateInterface } from "./conversation.interface";
import { deleteConversationAction, deleteConversationFailedAction, loadConversationMessagesAction, loadConversationMessagesFailedAction, loadConversationMessagesSuccessAction } from "./conversation.actions";

const initialState: ConversationStateInterface = {
  isLoading: false,
  backendErrors: null,
  messages: null,
  lastUpdated: null,
  loadedConversationIds: null
};

const reducer = createReducer(
  initialState,
  on(loadConversationMessagesAction,
    deleteConversationAction,
    (state): ConversationStateInterface => ({
      ...state,
      isLoading: true,
      backendErrors: null,
      messages: null
    }),
  ),
  on(loadConversationMessagesSuccessAction, (state, action): ConversationStateInterface => {
    const loadedConversationIds = state.loadedConversationIds ? [...state.loadedConversationIds, action.conversationData.conversationID] : [action.conversationData.conversationID];
    return {
      ...state,
      isLoading: false,
      backendErrors: null,
      messages: action.conversationData,
      loadedConversationIds,
    };
  }),
  on(loadConversationMessagesFailedAction,
    deleteConversationFailedAction,
    (state, action): ConversationStateInterface => ({
      ...state,
      isLoading: false,
      backendErrors: action.error,
    }),
  ),
)
export const conversationReducer: ActionReducer<ConversationStateInterface, Action> = (
  state,
  action,
) => reducer(state, action);