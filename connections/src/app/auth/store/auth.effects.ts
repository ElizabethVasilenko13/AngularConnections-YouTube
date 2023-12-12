import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, exhaustMap, catchError } from 'rxjs/operators';
import { sighUpAction, sighUpFailureAction, sighUpSuccessAction } from './auth.actions';
import { SignUpService } from '../services/sign-up.service';
import { of } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { NotifyStyles } from '../models/auth.enum';
import { Router } from '@angular/router';
import { AUTH_ROUTE, LOGIN_PAGE_ROUTE } from '@core/constants/routing';

@Injectable()
export class AuthEffects {
  constructor(
    private actions$: Actions,
    private signUpService: SignUpService,
    private router: Router
  ) {}

  register$ = createEffect(() =>
    this.actions$.pipe(
      ofType(sighUpAction),
      exhaustMap(({ userData }) => {
        return this.signUpService.signUp(userData).pipe(
          map(() => {
            this.signUpService.openSnackBar('You`ve been succesfully registered', NotifyStyles.Success);
            this.router.navigateByUrl(`/${AUTH_ROUTE}/${LOGIN_PAGE_ROUTE}`);
            return sighUpSuccessAction()
          }),
          catchError((error: HttpErrorResponse) => {
            this.signUpService.openSnackBar(error.error.message, NotifyStyles.Error)
            return of(
              sighUpFailureAction({error: error.error})
            )
          })
        )
      })
    )
  );
}
