import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { AuthErrorsTypes } from '@auth/models/auth.enum';
import { UserSignInProps } from '@auth/models/auth.interfaces';
import { SignInService } from '@auth/services/sign-in.service';
import { sighInAction, sighInResetAction } from '@auth/store/signin/signin.actions';
import { backendSignInErrorSelector, isSubmittingSignInSelector } from '@auth/store/signin/signin.selectors';
import { Store, select } from '@ngrx/store';
import { AuthError } from '@shared/types/user.interaces';
import { Observable, Subscription } from 'rxjs';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginFormComponent implements OnInit, OnDestroy {
  isSubmitting$: Observable<boolean> = this.store.pipe(select(isSubmittingSignInSelector));
  backendError$: Observable<AuthError | null> = this.store.pipe(select(backendSignInErrorSelector));
  isSubmitFormButtonDisable = false;
  subscriptions: Subscription[] = [];

  constructor(
    private store: Store,
    public signInService: SignInService,
  ) {}

  ngOnInit(): void {
    this.store.dispatch(sighInResetAction());
    this.initFormValueChanges();
  }

  initFormValueChanges(): void {
    const formValueChangesSubscription =
      this.signInService.loginForm.valueChanges.subscribe(() => {
        this.isSubmitFormButtonDisable = false;
      });

    this.subscriptions.push(formValueChangesSubscription);
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
