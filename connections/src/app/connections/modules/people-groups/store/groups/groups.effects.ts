import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, exhaustMap, catchError } from 'rxjs/operators';
import { of } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { NotifyService } from '@core/services/notify.service';
import { NotifyStyles } from '@shared/enums/notify.enum';
import { GroupsService } from '../../services/groups.service';
import { createGroupAction, createGroupFailedAction, createGroupSuccessAction, deleteGroupAction, deleteGroupFailedAction, deleteGroupSuccessAction, loadGroupsAction, loadGroupsFailedAction, loadGroupsSuccessAction } from './groups.actions';

@Injectable()
export class GroupsEffects {
  constructor(
    private actions$: Actions,
    private groupsService: GroupsService,
    private snackBar: NotifyService,
  ) {}

  loadGroups$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadGroupsAction),
      exhaustMap(() => {
        return this.groupsService.loadGroups().pipe(
          map((response) => {
            this.snackBar.openSnackBar(
              `Groups have been succesfully loaded`,
              NotifyStyles.Success,
            );
            return loadGroupsSuccessAction({ groups : {
              count: response.Count,
              items: response.Items
            } });
          }),
          catchError((error: HttpErrorResponse) => {
            this.snackBar.openSnackBar(error.error.message, NotifyStyles.Error);
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
            this.snackBar.openSnackBar(
              `Group have been succesfully created`,
              NotifyStyles.Success,
            );
            return createGroupSuccessAction({name, groupID: response.groupID, userId});
          }),
          catchError((error: HttpErrorResponse) => {
            this.snackBar.openSnackBar(error.error.message, NotifyStyles.Error);
            return of(createGroupFailedAction({ error: error.error }));
          }),
        );
      }),
    ),
  );

  deleteGroup$ = createEffect(() =>
    this.actions$.pipe(
      ofType(deleteGroupAction),
      exhaustMap(({ groupID }) => {
        return this.groupsService.deleteGroup(groupID).pipe(
          map(() => {
            this.snackBar.openSnackBar(
              `Group have been succesfully deleted`,
              NotifyStyles.Success,
            );
            return deleteGroupSuccessAction({groupID});
          }),
          catchError((error: HttpErrorResponse) => {
            this.snackBar.openSnackBar(error.error.message, NotifyStyles.Error);
            return of(deleteGroupFailedAction({ error: error.error }));
          }),
        );
      }),
    ),
  );
}
