import { createAction, props } from "@ngrx/store";
import { AuthError } from "@shared/types/user";
import { GroupMessagesProps } from "../../models/group-dialog";

export const loadGroupMessagesAction = createAction('[Group] Load Group', props<{ groupID: string }>());

export const  loadGroupMessagesSuccessAction = createAction('[Group] Load Group Success', props<{ groupData: GroupMessagesProps }>());
export const  loadGroupMessagesFailedAction = createAction(
  '[Group] Load Group Failed',
props<{ error: AuthError }>());

export const postNewMessageAction = createAction('[Group] Post Message', props<{ groupID: string; message: string }>());

export const postNewMessageSuccessAction = createAction('[Group] Post Message Success');
export const postNewMessageFailedAction = createAction(
  '[Group] Post Message Failed',
props<{ error: AuthError }>());
