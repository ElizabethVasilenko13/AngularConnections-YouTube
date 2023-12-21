import { Action, ActionReducer, createReducer, on } from "@ngrx/store";
import { ConversationStateInterface } from "./conversation.interface";
import { deleteConversationAction, deleteConversationFailedAction, deleteConversationSuccessAction, loadConversationMessagesAction, loadConversationMessagesFailedAction, loadConversationMessagesSuccessAction, postConversationMessageAction, postConversationMessageFailedAction, postConversationMessageSuccessAction } from "./conversation.actions";

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
    postConversationMessageAction,
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
  // on(deleteConversationSuccessAction,
  //   (state, action): ConversationStateInterface => {
  //     const updatedItems = state..items.filter(
  //       (item) => item.id.S !== action.groupID
  //     );
  //     const loadedGroupIds = state?.loadedGroupIds?.filter((id) => id !== action.groupID) ?? null;
  //     const updatedGroups = { ...state.groups, items: updatedItems };
  //     return {
  //       ...state,
  //       isLoading: false,
  //       backendErrors: null,
  //       groups: updatedGroups,
  //       loadedGroupIds
  //     };
  //   }
  // )
  // on(deleteConversationSuccessAction),
  on(loadConversationMessagesFailedAction,
    deleteConversationFailedAction,
    postConversationMessageFailedAction,
    (state, action): ConversationStateInterface => ({
      ...state,
      isLoading: false,
      backendErrors: action.error,
    }),
  ),
  on(postConversationMessageSuccessAction,
    (state): ConversationStateInterface => ({
      ...state,
      isLoading: false,
    }),
  ),
)
export const conversationReducer: ActionReducer<ConversationStateInterface, Action> = (
  state,
  action,
) => reducer(state, action);