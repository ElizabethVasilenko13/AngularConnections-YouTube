import { createAction, props } from "@ngrx/store";
import { AuthError } from "@shared/types/user";
import { GroupsProps } from "../../models/groups";

export const loadGroupsAction = createAction('[Groups] Load Groups');

export const loadGroupsSuccessAction = createAction('[Groups] Load Groups Success', props<{ groups: GroupsProps }>());
export const loadGroupsFailedAction = createAction(
  '[Groups] Load Groups Failed',
props<{ error: AuthError }>());

export const createGroupAction = createAction('[Groups] Create Group', props<{ name: string; userId: string }>());
export const createGroupSuccessAction = createAction('[Groups] Create Group Success', props<{ name: string; groupID: string; userId: string}>());
export const createGroupFailedAction = createAction(
  '[Groups] Create Group Failed',
props<{ error: AuthError }>());


export const deleteGroupAction = createAction('[Groups] Delete Group', props<{ groupID: string; redirect?: boolean }>());
export const deleteGroupSuccessAction = createAction('[Groups] Delete Group Success', props<{ groupID: string}>());
export const deleteGroupFailedAction = createAction(
  '[Groups] Delete Group Failed',
props<{ error: AuthError }>());