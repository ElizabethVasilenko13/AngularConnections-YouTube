import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, exhaustMap, catchError } from 'rxjs/operators';
import { AuthApiService } from '../../services/auth-api.service';
import { of } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import {
  sighInAction,
  sighInFailureAction,
  sighInSuccessAction,
} from './signin.actions';
import { NotifyService } from '@core/services/notify.service';
import { AuthService } from '@core/services/auth.service';
import { NotifyStyles } from '@shared/enums/notify.enum';

@Injectable()
export class SignInEffects {
  constructor(
    private actions$: Actions,
    private authApi: AuthApiService,
    private snackBar: NotifyService,
    private auth: AuthService,
  ) {}

  login$ = createEffect(() =>
    this.actions$.pipe(
      ofType(sighInAction),
      exhaustMap(({ userData }) => {
        return this.authApi.signIn(userData).pipe(
          map(({ token, uid }) => {
            this.snackBar.addMessage(
              `Welcome ${userData.email}`,
              NotifyStyles.Success,
            );
            this.auth.handleSignIn({ email: userData.email, token, uid })
            return sighInSuccessAction({ userData, token, uid });
          }),
          catchError((error: HttpErrorResponse) => {
            const errorMes = error.error;
            const errorSnakBar = error.error ? errorMes.message : error.message;
            this.snackBar.addMessage(errorSnakBar, NotifyStyles.Error);
            return of(sighInFailureAction({ error: error.error }));
          }),
        );
      }),
    ),
  );
}
