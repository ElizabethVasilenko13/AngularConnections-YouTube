import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, exhaustMap, catchError } from 'rxjs/operators';
import { of } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { NotifyService } from '@core/services/notify.service';
import { UserService } from '../services/user.service';
import { NotifyStyles } from '@shared/enums/notify.enum';
import { loadUserAction, loadUserFailedAction, loadUserSuccessfulAction } from './user.actions';
import { LocalStorageService } from '@core/services/local-storage.service';
import { UserProfileProps } from 'src/app/connections/models/user';
import { DatePipe } from '@angular/common';

@Injectable()
export class UserEffects {
  constructor(
    private actions$: Actions,
    private userService: UserService,
    private snackBar: NotifyService,
    private localStorageService: LocalStorageService,
    private datePipe: DatePipe
  ) {}

  register$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadUserAction),
      exhaustMap(() => {
        const userData: UserProfileProps = this.localStorageService.get('userData');
        return this.userService.loadUser(userData).pipe(
          map((response) => {
            this.snackBar.openSnackBar(
              `${response.email.S} been succesfully loaded`,
              NotifyStyles.Success,
            );
            return loadUserSuccessfulAction({
              uid: response.uid.S,
              email: response.email.S,
              name: response.name.S,
              createdAt: this.datePipe.transform(parseInt(response.createdAt.S), 'yyyy-MM-dd HH:mm:ss') || 'Date',})
          }),
          catchError((error: HttpErrorResponse) => {
            this.snackBar.openSnackBar(
              error.error.message,
              NotifyStyles.Error,
            );
            return of(loadUserFailedAction({ error: error.error }));
          }),
        );
      }),
    ),
  );
}
