import { Action, ActionReducer, createReducer, on } from "@ngrx/store";
import { GroupDialogStateInterface } from "./group-dialog.interface";
import { loadGroupMessagesAction, loadGroupMessagesFailedAction, loadGroupMessagesSuccessAction } from "./group-dialog.actions";

const initialState: GroupDialogStateInterface = {
  isLoading: false,
  backendErrors: null,
  messages: null,
  loadedGroupIds: null
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
  on(loadGroupMessagesSuccessAction, (state, action): GroupDialogStateInterface => {
    const loadedGroupIds = state.loadedGroupIds ? [...state.loadedGroupIds, action.groupData.groupID] : [action.groupData.groupID];
    return {
      ...state,
      isLoading: false,
      backendErrors: null,
      messages: action.groupData,
      loadedGroupIds,
    };
  }),
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