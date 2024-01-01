import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { UserSignInProps } from '../../models/auth.interfaces';
import { Store, select } from '@ngrx/store';
import {
  backendSignInErrorSelector,
  isSubmittingSignInSelector,
} from '../../store/signin/signin.selectors';
import {
  sighInAction,
  sighInResetAction,
} from '../../store/signin/signin.actions';
import { AuthError } from '@shared/types/user.interaces';
import { SignInService } from '@auth/services/sign-in.service';
import { AuthErrorsTypes } from '@auth/models/auth.enum';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss'],
})
export class LoginPageComponent implements OnInit, OnDestroy {
  isSubmitting$!: Observable<boolean>;
  backendError$!: Observable<AuthError | null>;
  isSubmitFormButtonDisable = false;
  subscriptions: Subscription[] = [];

  constructor(
    private store: Store,
    public signInService: SignInService,
  ) {}

  ngOnInit(): void {
    this.signInService.initForm();
    this.initValues();
    this.initFormValueChanges();
  }

  initFormValueChanges(): void {
    const formValueChangesSubscription =
      this.signInService.loginForm.valueChanges.subscribe(() => {
        this.isSubmitFormButtonDisable = false;
      });

    this.subscriptions.push(formValueChangesSubscription);
  }

  initValues(): void {
    this.store.dispatch(sighInResetAction());
    this.isSubmitting$ = this.store.pipe(select(isSubmittingSignInSelector));
    this.backendError$ = this.store.pipe(select(backendSignInErrorSelector));
  }

  onSubmit(): void {
    const userData = this.signInService.loginForm.value as UserSignInProps;
    this.store.dispatch(sighInAction({ userData }));

    const backendErrorsSubscr = this.backendError$.subscribe((error) => {
      if (error?.type === AuthErrorsTypes.NotFound) {
        this.isSubmitFormButtonDisable = true;
      }
    });

    this.subscriptions.push(backendErrorsSubscr);
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((subscription) => subscription.unsubscribe());
  }
}
