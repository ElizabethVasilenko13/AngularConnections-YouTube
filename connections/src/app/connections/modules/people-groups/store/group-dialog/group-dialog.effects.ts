import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, exhaustMap, catchError } from 'rxjs/operators';
import { of } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { NotifyService } from '@core/services/notify.service';
import { NotifyStyles } from '@shared/enums/notify.enum';
import { loadGroupMessagesAction, loadGroupMessagesFailedAction, loadGroupMessagesSuccessAction } from './group-dialog.actions';
import { GroupDialogService } from '../../services/group-dialog.service';
import { DatePipe } from '@angular/common';

@Injectable()
export class GroupDialodEffects {
  constructor(
    private actions$: Actions,
    private groupDialog: GroupDialogService,
    private snackBar: NotifyService,
    private datePipe: DatePipe,
  ) {}

  loadGroupDialog$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadGroupMessagesAction),
      exhaustMap(({groupID}) => {
        return this.groupDialog.loadAllMesages(groupID).pipe(
          map((response) => {
            this.snackBar.addMessage(
              `Group have been succesfully loaded`,
              NotifyStyles.Success,
            );
            return loadGroupMessagesSuccessAction({ groupData : {
              groupID,
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

}
