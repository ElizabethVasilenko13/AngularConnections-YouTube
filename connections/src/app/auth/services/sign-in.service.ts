import { Injectable } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { AuthErrorsTypes } from '@auth/models/auth.enum';
import { UserSignInProps } from '@auth/models/auth.interfaces';
import { sighInAction, sighInResetAction } from '@auth/store/signin/signin.actions';
import { isSubmittingSignInSelector, backendSignInErrorSelector } from '@auth/store/signin/signin.selectors';
import { Store, select } from '@ngrx/store';
import { AuthError } from '@shared/types/user.interaces';
import { BehaviorSubject, Observable, Subscription } from 'rxjs';

@Injectable()
export class SignInService {
  isSubmitting$: Observable<boolean> = this.store.pipe(select(isSubmittingSignInSelector));
  backendError$: Observable<AuthError | null> = this.store.pipe(select(backendSignInErrorSelector));
  isSubmitFormButtonDisable$ = new BehaviorSubject(false);
  subscriptions: Subscription[] = [];
  loginForm  = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required]],
  });

  constructor(private fb: FormBuilder, private store: Store,) {}

  resetSignIn(): void {
    this.loginForm.reset();
    this.store.dispatch(sighInResetAction());
  }

  initFormValueChanges(): void {
    const formValueChangesSubscription =
      this.loginForm.valueChanges.subscribe(() => {
        this.isSubmitFormButtonDisable$.next(false);
      });

    this.subscriptions.push(formValueChangesSubscription);
  }

  onSubmit(): void {
    const userData = this.loginForm.value as UserSignInProps;
    this.store.dispatch(sighInAction({ userData }));
    const backendErrorsSubscr = this.backendError$.subscribe((error) => {
      if (error?.type === AuthErrorsTypes.NotFound) {
        this.isSubmitFormButtonDisable$.next(true);
      }
    });
    this.subscriptions.push(backendErrorsSubscr);
  }

}
