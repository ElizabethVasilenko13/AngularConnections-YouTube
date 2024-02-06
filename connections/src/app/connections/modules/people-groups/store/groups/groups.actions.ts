import { createAction, props } from '@ngrx/store';
import { AuthError } from '@shared/types/user.interaces';
import { GroupsProps } from '../../models/groups';
import { MessageProps } from '../../models/conversation';

export const loadGroupsAction = createAction('[Groups] Load Groups');

export const loadGroupsSuccessAction = createAction(
  '[Groups] Load Groups Success',
  props<{ groups: GroupsProps }>(),
);
export const loadGroupsFailedAction = createAction(
  '[Groups] Load Groups Failed',
  props<{ error: AuthError }>(),
);

export const createGroupAction = createAction(
  '[Groups] Create Group',
  props<{ name: string; userId: string }>(),
);
export const createGroupSuccessAction = createAction(
  '[Groups] Create Group Success',
  props<{ name: string; groupID: string; userId: string }>(),
);
export const createGroupFailedAction = createAction(
  '[Groups] Create Group Failed',
  props<{ error: AuthError }>(),
);

export const deleteGroupAction = createAction(
  '[Groups] Delete Group',
  props<{ groupID: string; redirect?: boolean }>(),
);
export const deleteGroupSuccessAction = createAction(
  '[Groups] Delete Group Success',
  props<{ groupID: string }>(),
);
export const deleteGroupFailedAction = createAction(
  '[Groups] Delete Group Failed',
  props<{ error: AuthError }>(),
);

export const loadGroupMessagesSinceAction = createAction(
  '[Group] Load Group Since',
  props<{ groupID: string; time: number }>(),
);

export const loadGroupMessagesSinceSuccessAction = createAction(
  '[Group] Load Group Since Success',
  props<{ groupData: MessageProps; time: number; groupID: string }>(),
);
export const loadGroupMessagesSinceFailedAction = createAction(
  '[Group] Load Group Since Failed',
  props<{ error: AuthError }>(),
);

export const postNewMessageAction = createAction(
  '[Group] Post Message',
  props<{ groupID: string; message: string; time: number }>(),
);

export const postNewMessageSuccessAction = createAction('[Group] Post Message Success');
export const postNewMessageFailedAction = createAction(
  '[Group] Post Message Failed',
  props<{ error: AuthError }>(),
);
