import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, exhaustMap, catchError } from 'rxjs/operators';
import { of } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { NotifyService } from '@core/services/notify.service';
import { NotifyStyles } from '@shared/enums/notify.enum';
import { GroupsService } from '../../services/groups.service';
import { createGroupAction, createGroupFailedAction, createGroupSuccessAction, deleteGroupAction, deleteGroupFailedAction, deleteGroupSuccessAction, loadGroupsAction, loadGroupsFailedAction, loadGroupsSuccessAction } from './groups.actions';
import { Router } from '@angular/router';

@Injectable()
export class GroupsEffects {
  constructor(
    private actions$: Actions,
    private groupsService: GroupsService,
    private snackBar: NotifyService,
    private router: Router
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
            this.snackBar.addMessage(error.error.message, NotifyStyles.Error);
            return of(loadGroupsFailedAction({ error: error.error }));
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
            this.snackBar.addMessage(error.error.message, NotifyStyles.Error);
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
            this.snackBar.addMessage(error.error.message, NotifyStyles.Error);
            return of(deleteGroupFailedAction({ error: error.error }));
          }),
        );
      }),
    ),
  );
}
