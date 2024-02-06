import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, switchMap, catchError } from 'rxjs/operators';
import { of } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { NotifyService } from '@core/services/notify.service';
import { NotifyStyles } from '@shared/enums/notify.enum';
import {
  createGroupAction,
  createGroupFailedAction,
  createGroupSuccessAction,
  deleteGroupAction,
  deleteGroupFailedAction,
  deleteGroupSuccessAction,
  loadGroupMessagesSinceAction,
  loadGroupMessagesSinceFailedAction,
  loadGroupMessagesSinceSuccessAction,
  loadGroupsAction,
  loadGroupsFailedAction,
  loadGroupsSuccessAction,
  postNewMessageAction,
  postNewMessageFailedAction,
  postNewMessageSuccessAction,
} from './groups.actions';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { GroupsApiService } from '../../services/groups-api.service';
import { GroupsService } from '../../services/groups.service';

@Injectable()
export class GroupsEffects {
  constructor(
    private actions$: Actions,
    private groupsApi: GroupsApiService,
    private snackBar: NotifyService,
    private router: Router,
    private store: Store,
    private groupsservice: GroupsService
  ) {}

  loadGroups$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadGroupsAction),
      switchMap(() => {
        return this.groupsApi.loadGroups().pipe(
          map((response) => {
            this.snackBar.addMessage(`Groups have been succesfully loaded`, NotifyStyles.Success);
            const transformedGroups = response.Items.map((group) => ({
              createdAt: group.createdAt.S,
              id: group.id.S,
              name: group.name.S,
              createdBy: group.createdBy.S
            }));
            return loadGroupsSuccessAction({
              groups: {
                count: response.Count,
                items: transformedGroups,
              },
            });
          }),
          catchError((error: HttpErrorResponse) => {
            const errorMes = error.error;
            const errorSnakBar = errorMes ? errorMes.message : error.message;
            this.snackBar.addMessage(errorSnakBar, NotifyStyles.Error);
            return of(loadGroupsFailedAction({ error: error.error }));
          }),
        );
      }),
    ),
  );

  loadGroupDialogSince$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadGroupMessagesSinceAction),
      switchMap(({ groupID, time }) => {
        return this.groupsApi.loadAllMesages(groupID, time).pipe(
          map((response) => {
            this.snackBar.addMessage(
              `Last messages have been succesfully loaded`,
              NotifyStyles.Success,
            );
            const transformedConversation = response.Items.map((conversation) => ({
              authorID: conversation.authorID.S,
              message:  conversation.message.S,
              createdAt: conversation.createdAt.S
            }));
            return loadGroupMessagesSinceSuccessAction({
              groupID,
              time: new Date().getTime(),
              groupData: {
                count: response.Count,
                items: transformedConversation,
              },
            });
          }),
          catchError((error: HttpErrorResponse) => {
            const errorMes = error.error;
            const errorSnakBar = errorMes ? errorMes.message : error.message;
            this.snackBar.addMessage(errorSnakBar, NotifyStyles.Error);
            return of(loadGroupMessagesSinceFailedAction({ error: error.error }));
          }),
        );
      }),
    ),
  );

  postNewMessage$ = createEffect(() =>
    this.actions$.pipe(
      ofType(postNewMessageAction),
      switchMap(({ groupID, message, time }) => {
        return this.groupsApi.postNewMessage(groupID, message).pipe(
          map(() => {
            this.snackBar.addMessage(`Message was sent successfully`, NotifyStyles.Success);
            this.store.dispatch(loadGroupMessagesSinceAction({ groupID, time }));
            return postNewMessageSuccessAction();
          }),
          catchError((error: HttpErrorResponse) => {
            const errorMes = error.error;
            const errorSnakBar = errorMes ? errorMes.message : error.message;
            this.snackBar.addMessage(errorSnakBar, NotifyStyles.Error);
            return of(postNewMessageFailedAction({ error: error.error }));
          }),
        );
      }),
    ),
  );

  createGroup$ = createEffect(() =>
    this.actions$.pipe(
      ofType(createGroupAction),
      switchMap(({ name, userId }) => {
        return this.groupsApi.createGroup(name).pipe(
          map((response) => {
            this.snackBar.addMessage(`Group have been succesfully created`, NotifyStyles.Success);
            this.groupsApi.isCreateGroupModalClosed.next(true);
            this.groupsservice.isGroupJustCreated$.next(true);
            return createGroupSuccessAction({
              name,
              groupID: response.groupID,
              userId,
            });
          }),
          catchError((error: HttpErrorResponse) => {
            this.groupsApi.isCreateGroupModalClosed.next(false);
            const errorMes = error.error;
            const errorSnakBar = errorMes ? errorMes.message : error.message;
            this.snackBar.addMessage(errorSnakBar, NotifyStyles.Error);
            return of(createGroupFailedAction({ error: error.error }));
          }),
        );
      }),
    ),
  );

  deleteGroup$ = createEffect(() =>
    this.actions$.pipe(
      ofType(deleteGroupAction),
      switchMap(({ groupID, redirect }) => {
        return this.groupsApi.deleteGroup(groupID).pipe(
          map(() => {
            this.snackBar.addMessage(`Group have been succesfully deleted`, NotifyStyles.Success);
            if (redirect) this.router.navigate(['/']);
            return deleteGroupSuccessAction({ groupID });
          }),
          catchError((error: HttpErrorResponse) => {

            const errorMes = error.error;
            const errorSnakBar = errorMes ? errorMes.message : error.message;
            this.snackBar.addMessage(errorSnakBar, NotifyStyles.Error);
            return of(deleteGroupFailedAction({ error: error.error }));
          }),
        );
      }),
    ),
  );
}
