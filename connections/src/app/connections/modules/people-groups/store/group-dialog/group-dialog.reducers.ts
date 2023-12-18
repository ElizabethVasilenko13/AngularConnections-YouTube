import { Action, ActionReducer, createReducer, on } from "@ngrx/store";
import { GroupDialogStateInterface } from "./group-dialog.interface";
import { loadGroupMessagesAction, loadGroupMessagesFailedAction, loadGroupMessagesSuccessAction } from "./group-dialog.actions";

const initialState: GroupDialogStateInterface = {
  isLoading: false,
  backendErrors: null,
  messages: null
};

const reducer = createReducer(
  initialState,
  on(loadGroupMessagesAction,
    (state): GroupDialogStateInterface => ({
      ...state,
      isLoading: true,
      backendErrors: null,
    }),
  ),
  on(loadGroupMessagesSuccessAction,
    (state, action): GroupDialogStateInterface => ({
      ...state,
      isLoading: false,
      backendErrors: null,
      messages: action.groupData
    }),
  ),
  on(loadGroupMessagesFailedAction,
    (state, action): GroupDialogStateInterface => ({
      ...state,
      isLoading: false,
      backendErrors: action.error,
    }),
  ),
)
export const groupDialogReducer: ActionReducer<GroupDialogStateInterface, Action> = (
  state,
  action,
) => reducer(state, action);