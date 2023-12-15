import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, exhaustMap, catchError } from 'rxjs/operators';
import { of } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { NotifyService } from '@core/services/notify.service';
import { UserService } from '../services/user.service';
import { NotifyStyles } from '@shared/enums/notify.enum';
import {
  LogoutAction,
  LogoutFailedAction,
  LogoutSuccessfulAction,
  UpdateUserFailedNameAction,
  UpdateUserNameAction,
  UpdateUserSuccessfulNameAction,
  loadUserAction,
  loadUserFailedAction,
  loadUserSuccessfulAction,
} from './user.actions';
import { DatePipe } from '@angular/common';

@Injectable()
export class UserEffects {
  constructor(
    private actions$: Actions,
    private userService: UserService,
    private snackBar: NotifyService,
    private datePipe: DatePipe
  ) {}

  loadUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadUserAction),
      exhaustMap(() => {
        return this.userService.loadUser().pipe(
          map((response) => {
            this.snackBar.openSnackBar(
              `${response.email.S} been succesfully loaded`,
              NotifyStyles.Success,
            );
            return loadUserSuccessfulAction({
              uid: response.uid.S,
              email: response.email.S,
              name: response.name.S,
              createdAt:
                this.datePipe.transform(
                  parseInt(response.createdAt.S),
                  'yyyy-MM-dd HH:mm:ss',
                ) || 'Date',
            });
          }),
          catchError((error: HttpErrorResponse) => {
            this.snackBar.openSnackBar(error.error.message, NotifyStyles.Error);
            return of(loadUserFailedAction({ error: error.error }));
          }),
        );
      }),
    ),
  );

  updateUserName$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UpdateUserNameAction),
      exhaustMap(({ name }) => {
        return this.userService.updateUser(name).pipe(
          map(() => {
            this.snackBar.openSnackBar(
              `User name has been updated successfully`,
              NotifyStyles.Success,
            );
            return UpdateUserSuccessfulNameAction({ name });
          }),
          catchError((error: HttpErrorResponse) => {
            this.snackBar.openSnackBar(error.error.message, NotifyStyles.Error);
            return of(UpdateUserFailedNameAction({ error: error.error }));
          }),
        );
      }),
    ),
  );

  logout$ = createEffect(() =>
    this.actions$.pipe(
      ofType(LogoutAction),
      exhaustMap(() => {
        return this.userService.logout().pipe(
          map(() => {
            this.snackBar.openSnackBar('Logout successful', NotifyStyles.Success);
            this.userService.handleLodout();
            return LogoutSuccessfulAction();
          }),
          catchError((error: HttpErrorResponse) => {
            this.snackBar.openSnackBar(error.error.message, NotifyStyles.Error);
            return of(LogoutFailedAction({ error: error.error }));
          }),
        );
      }),
    ),
  );
}
