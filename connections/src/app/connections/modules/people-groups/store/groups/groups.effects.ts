import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, exhaustMap, catchError } from 'rxjs/operators';
import { of } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { NotifyService } from '@core/services/notify.service';
import { NotifyStyles } from '@shared/enums/notify.enum';
import { DatePipe } from '@angular/common';
import { GroupsService } from '../../services/groups.service';
import { loadGroupsAction, loadGroupsFailedAction, loadGroupsSuccessAction } from './groups.actions';

@Injectable()
export class GroupsEffects {
  constructor(
    private actions$: Actions,
    private groupsService: GroupsService,
    private snackBar: NotifyService,
    private datePipe: DatePipe,
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
}
