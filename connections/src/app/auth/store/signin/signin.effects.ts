import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, exhaustMap, catchError } from 'rxjs/operators';
import { SignUpService } from '../../services/sign-up.service';
import { of } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { NotifyStyles } from '../../models/auth.enum';
import { Router } from '@angular/router';
import { sighInAction, sighInFailureAction, sighInSuccessAction } from './signin.actions';
import { LocalStorageService } from '@core/services/local-storage.service';
import { MAIN_PAGE_ROUTE } from '@core/constants/routing';

@Injectable()
export class SignInEffects {
  constructor(
    private actions$: Actions,
    private signUpService: SignUpService,
    private router: Router,
    private localStorageService: LocalStorageService
  ) {}

  register$ = createEffect(() =>
    this.actions$.pipe(
      ofType(sighInAction),
      exhaustMap(({ userData }) => {
        return this.signUpService.signIn(userData).pipe(
          map(({ token, uid }) => {
            this.signUpService.openSnackBar(
              `Welcome ${userData.email}`,
              NotifyStyles.Success,
            );
            this.localStorageService.set('userData', {
              email: userData.email,
              token, uid
            })
            this.router.navigateByUrl(MAIN_PAGE_ROUTE);
            return sighInSuccessAction({ userData, token, uid });
          }),
          catchError((error: HttpErrorResponse) => {
            this.signUpService.openSnackBar(
              error.error.message,
              NotifyStyles.Error,
            );
            return of(sighInFailureAction({ error: error.error }));
          }),
        );
      }),
    ),
  );
}
