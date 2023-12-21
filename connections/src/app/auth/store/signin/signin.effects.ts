import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, exhaustMap, catchError } from 'rxjs/operators';
import { SignUpService } from '../../services/sign-up.service';
import { of } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import {
  sighInAction,
  sighInFailureAction,
  sighInSuccessAction,
} from './signin.actions';
import { LocalStorageService } from '@core/services/local-storage.service';
import { NotifyService } from '@core/services/notify.service';
import { AuthService } from '@core/services/auth.service';
import { NotifyStyles } from '@shared/enums/notify.enum';

@Injectable()
export class SignInEffects {
  constructor(
    private actions$: Actions,
    private signUpService: SignUpService,
    private router: Router,
    private localStorageService: LocalStorageService,
    private snackBar: NotifyService,
    private auth: AuthService,
  ) {}

  register$ = createEffect(() =>
    this.actions$.pipe(
      ofType(sighInAction),
      exhaustMap(({ userData }) => {
        return this.signUpService.signIn(userData).pipe(
          map(({ token, uid }) => {
            this.snackBar.addMessage(
              `Welcome ${userData.email}`,
              NotifyStyles.Success,
            );
            this.localStorageService.set('userData', {
              email: userData.email,
              token,
              uid,
            });
            this.auth.isLoggedIn.next(true);
            this.router.navigate(['/']);
            return sighInSuccessAction({ userData, token, uid });
          }),
          catchError((error: HttpErrorResponse) => {
            const errorMes = error.error;
            const errorSnakBar = error.error ? errorMes.message : error.message;
            // const message = error.error ? error.error.message || 'Error' : 'Error'
            this.snackBar.addMessage(errorSnakBar, NotifyStyles.Error);
            return of(sighInFailureAction({ error: error.error }));
          }),
        );
      }),
    ),
  );
}
