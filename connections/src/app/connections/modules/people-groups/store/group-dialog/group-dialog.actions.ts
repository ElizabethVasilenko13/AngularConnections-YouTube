import { createAction, props } from "@ngrx/store";
import { AuthError } from "@shared/types/user";
import { GroupMessagesProps } from "../../models/group-dialog";

export const loadGroupMessagesAction = createAction('[Group] Load Group', props<{ groupID: string }>());

export const  loadGroupMessagesSuccessAction = createAction('[Group] Load Group Success', props<{ groupData: GroupMessagesProps }>());
export const  loadGroupMessagesFailedAction = createAction(
  '[Group] Load Group Failed',
props<{ error: AuthError }>());