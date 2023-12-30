import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, exhaustMap, catchError } from 'rxjs/operators';
import { of } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { NotifyService } from '@core/services/notify.service';
import { NotifyStyles } from '@shared/enums/notify.enum';
import { GroupsService } from '../../services/groups.service';
import { createGroupAction, createGroupFailedAction, createGroupSuccessAction, deleteGroupAction, deleteGroupFailedAction, deleteGroupSuccessAction, loadGroupMessagesAction, loadGroupMessagesFailedAction, loadGroupMessagesSinceAction, loadGroupMessagesSinceSuccessAction, loadGroupMessagesSuccessAction, loadGroupsAction, loadGroupsFailedAction, loadGroupsSuccessAction, postNewMessageAction, postNewMessageFailedAction, postNewMessageSuccessAction } from './groups.actions';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';

@Injectable()
export class GroupsEffects {
  constructor(
    private actions$: Actions,
    private groupsService: GroupsService,
    private snackBar: NotifyService,
    private router: Router,
    private store: Store
  ) {}

  loadGroups$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadGroupsAction),
      exhaustMap(() => {
        return this.groupsService.loadGroups().pipe(
          map((response) => {
            this.snackBar.addMessage(
              `Groups have been succesfully loaded`,
              NotifyStyles.Success,
            );
            return loadGroupsSuccessAction({ groups : {
              count: response.Count,
              items: response.Items
            } });
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

  loadGroupDialog$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadGroupMessagesAction),
      exhaustMap(({groupID}) => {
        return this.groupsService.loadAllMesages(groupID).pipe(
          map((response) => {
            this.snackBar.addMessage(
              `Group have been succesfully loaded`,
              NotifyStyles.Success,
            );
            return loadGroupMessagesSuccessAction({groupID, time: new Date().getTime(), groupData : {
              count: response.Count,
              items: response.Items
            } });
          }),
          catchError((error: HttpErrorResponse) => {
            this.snackBar.addMessage(error.error.message, NotifyStyles.Error);
            return of(loadGroupMessagesFailedAction({ error: error.error }));
          }),
        );
      }),
    ),
  );

  loadGroupDialogSince$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadGroupMessagesSinceAction),
      exhaustMap(({groupID, time}) => {
        return this.groupsService.loadAllMesages(groupID, time).pipe(
          map((response) => {
            this.snackBar.addMessage(
              `Last messages have been succesfully loaded`,
              NotifyStyles.Success,
            );
            return loadGroupMessagesSinceSuccessAction({groupID, time: new Date().getTime(), groupData : {
              count: response.Count,
              items: response.Items
            } });
          }),
          catchError((error: HttpErrorResponse) => {
            const errorMes = error.error;
            const errorSnakBar = errorMes ? errorMes.message : error.message;
            this.snackBar.addMessage(errorSnakBar, NotifyStyles.Error);
            return of(loadGroupMessagesFailedAction({ error: error.error }));
          }),
        );
      }),
    ),
  );

  postNewMessage$ = createEffect(() =>
    this.actions$.pipe(
      ofType(postNewMessageAction),
      exhaustMap(({groupID, message, time}) => {
        return this.groupsService.postNewMessage(groupID, message).pipe(
          map(() => {
            this.snackBar.addMessage(
              `Message was sent successfully`,
              NotifyStyles.Success,
            );
            this.store.dispatch(loadGroupMessagesSinceAction({groupID, time}))
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
      exhaustMap(({ name, userId }) => {
        return this.groupsService.createGroup(name).pipe(
          map((response) => {
            this.snackBar.addMessage(
              `Group have been succesfully created`,
              NotifyStyles.Success,
            );
            this.groupsService.isCreateGroupModalClosed.next(true);
            return createGroupSuccessAction({name, groupID: response.groupID, userId});
          }),
          catchError((error: HttpErrorResponse) => {
            this.groupsService.isCreateGroupModalClosed.next(false);
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
      exhaustMap(({ groupID, redirect }) => {
        return this.groupsService.deleteGroup(groupID).pipe(
          map(() => {
            this.snackBar.addMessage(
              `Group have been succesfully deleted`,
              NotifyStyles.Success,
            );
            if (redirect) this.router.navigate(['/']);
            return deleteGroupSuccessAction({groupID});
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
