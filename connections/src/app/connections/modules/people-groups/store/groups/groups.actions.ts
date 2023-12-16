import { createAction, props } from "@ngrx/store";
import { AuthError } from "@shared/types/user";
import { GroupsProps } from "../../models/groups";

export const loadGroupsAction = createAction('[Groups] Load Groups');

export const loadGroupsSuccessAction = createAction('[Groups] Load Groups Success', props<{ groups: GroupsProps }>());
export const loadGroupsFailedAction = createAction(
  '[Groups] Load Groups Failed',
props<{ error: AuthError }>());