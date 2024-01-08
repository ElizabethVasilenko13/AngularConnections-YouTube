import { Injectable } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { AuthErrorsTypes } from '@auth/models/auth.enum';
import { UserSignUpProps } from '@auth/models/auth.interfaces';
import { sighUpAction, sighUpResetAction } from '@auth/store/signup/signup.actions';
import { backendErrorSelector, isSubmittingSelector } from '@auth/store/signup/signup.selectors';
import { Store, select } from '@ngrx/store';
import { AuthError } from '@shared/types/user.interaces';
import { BehaviorSubject, Observable, Subscription } from 'rxjs';

@Injectable()
export class SignUpService {
  isSubmitting$: Observable<boolean> = this.store.pipe(select(isSubmittingSelector));
  backendError$: Observable<AuthError | null> = this.store.pipe(select(backendErrorSelector));
  isSubmitFormButtonDisable$ = new BehaviorSubject(false);
  subscriptions: Subscription[] = [];
  registrationForm = this.fb.group({
    name: [
      '',
      [Validators.required, Validators.maxLength(40), Validators.pattern(/^[a-zA-Z\s]+$/)],
    ],
    email: ['', [Validators.required, Validators.email]],
    password: [
      '',
      [
        Validators.required,
        Validators.minLength(8),
        Validators.pattern(/^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+])[A-Za-z\d!@#$%^&*()_+]+$/),
      ],
    ],
  });

  constructor(
    private fb: FormBuilder,
    private store: Store,
  ) {}

  resetSignUp(): void {
    this.registrationForm.reset();
    this.store.dispatch(sighUpResetAction());
  }

  initFormValueChanges(): void {
    const formValueChangesSubscription = this.registrationForm.valueChanges.subscribe(() => {
      this.isSubmitFormButtonDisable$.next(false);
    });

    this.subscriptions.push(formValueChangesSubscription);
  }

  onSubmit(): void {
    const userData = this.registrationForm.value as UserSignUpProps;
    this.store.dispatch(sighUpAction({ userData }));
    const backendErrorsSubscr = this.backendError$.subscribe((error) => {
      if (error?.type === AuthErrorsTypes.Duplication) this.isSubmitFormButtonDisable$.next(true);
    });
    this.subscriptions.push(backendErrorsSubscr);
  }
}
