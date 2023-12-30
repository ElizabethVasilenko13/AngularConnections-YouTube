import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable, Subscription } from 'rxjs';
import { UserSignInProps } from '../../models/auth';
import { Store, select } from '@ngrx/store';
import {
  backendSignInErrorSelector,
  isSubmittingSignInSelector,
} from '../../store/signin/signin.selectors';
import {
  sighInAction,
  sighInResetAction,
} from '../../store/signin/signin.actions';
import { AuthError } from '@shared/types/user';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss'],
})
export class LoginPageComponent implements OnInit, OnDestroy {
  loginForm!: FormGroup;
  isSubmitting$!: Observable<boolean>;
  backendError$!: Observable<AuthError | null>;
  disableSubmitButton = false;
  subscriptions: Subscription[] = [];

  constructor(
    private fb: FormBuilder,
    private store: Store,
  ) {}

  ngOnInit(): void {
    this.initForm();
    this.initValues();
    this.initFormValueChanges();
  }

  initFormValueChanges(): void {
    const formValueChangesSubscription = this.loginForm.valueChanges.subscribe(
      () => {
        this.disableSubmitButton = false;
      },
    );

    this.subscriptions.push(formValueChangesSubscription);
  }

  initValues(): void {
    this.store.dispatch(sighInResetAction());
    this.isSubmitting$ = this.store.pipe(select(isSubmittingSignInSelector));
    this.backendError$ = this.store.pipe(select(backendSignInErrorSelector));
  }

  initForm(): void {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
    });
  }

  onSubmit(): void {
    const userData = this.loginForm.value as UserSignInProps;
    this.store.dispatch(sighInAction({ userData }));

    const backendErrorsSubscr = this.backendError$.subscribe((error) => {
      if (error?.type === 'NotFoundException') {
        this.disableSubmitButton = true;
      }
    });

    this.subscriptions.push(backendErrorsSubscr);
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(subscription => subscription.unsubscribe());
  }
}
