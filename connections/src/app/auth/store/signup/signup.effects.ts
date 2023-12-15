import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, exhaustMap, catchError } from 'rxjs/operators';
import {
  sighUpAction,
  sighUpFailureAction,
  sighUpSuccessAction,
} from './signup.actions';
import { SignUpService } from '../../services/sign-up.service';
import { of } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { AUTH_ROUTE, LOGIN_PAGE_ROUTE } from '@core/constants/routing';
import { NotifyService } from '@core/services/notify.service';
import { NotifyStyles } from '@shared/enums/notify.enum';

@Injectable()
export class AuthEffects {
  constructor(
    private actions$: Actions,
    private signUpService: SignUpService,
    private router: Router,
    private snackBar: NotifyService,
  ) {}

  register$ = createEffect(() =>
    this.actions$.pipe(
      ofType(sighUpAction),
      exhaustMap(({ userData }) => {
        return this.signUpService.signUp(userData).pipe(
          map(() => {
            this.snackBar.openSnackBar(
              'You`ve been succesfully registered',
              NotifyStyles.Success,
            );
            this.router.navigateByUrl(`/${AUTH_ROUTE}/${LOGIN_PAGE_ROUTE}`);
            return sighUpSuccessAction();
          }),
          catchError((error: HttpErrorResponse) => {
            const errorMes = error && error.error;
            const errorSnakBar = errorMes ? errorMes.message : error.message;
            this.snackBar.openSnackBar(errorSnakBar, NotifyStyles.Error);
            return of(sighUpFailureAction({ error: error.error }));
          }),
        );
      }),
    ),
  );
}
