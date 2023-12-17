import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, exhaustMap, catchError } from 'rxjs/operators';
import { of } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { NotifyService } from '@core/services/notify.service';
import { NotifyStyles } from '@shared/enums/notify.enum';
import { loadUsersAction, loadUsersFailedAction, loadUsersSuccessAction } from './users.actions';
import { UsersService } from '../../services/users.service';

@Injectable()
export class UsersEffects {
  constructor(
    private actions$: Actions,
    private snackBar: NotifyService,
    private users: UsersService
  ) {}

  loadUsers$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadUsersAction),
      exhaustMap(({currentUserId}) => {
        return this.users.loadUsers().pipe(
          map((response) => {
            this.snackBar.openSnackBar(
              `Users have been succesfully loaded`,
              NotifyStyles.Success,
            );
            const filteredUsers = response.Items.filter(user => user.uid.S !== currentUserId);

            return loadUsersSuccessAction({ users : {
              count: response.Count,
              items: filteredUsers
            }, currentUserId});
          }),
          catchError((error: HttpErrorResponse) => {
            this.snackBar.openSnackBar(error.error.message, NotifyStyles.Error);
            return of(loadUsersFailedAction({ error: error.error }));
          }),
        );
      }),
    ),
  );

}
