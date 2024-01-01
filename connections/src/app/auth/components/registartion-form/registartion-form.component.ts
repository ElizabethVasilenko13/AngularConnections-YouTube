import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { AuthErrorsTypes } from '@auth/models/auth.enum';
import { UserSignUpProps } from '@auth/models/auth.interfaces';
import { SignUpService } from '@auth/services/sign-up.service';
import { sighUpAction, sighUpResetAction } from '@auth/store/signup/signup.actions';
import { backendErrorSelector, isSubmittingSelector } from '@auth/store/signup/signup.selectors';
import { Store, select } from '@ngrx/store';
import { AuthError } from '@shared/types/user.interaces';
import { Observable, Subscription } from 'rxjs';

@Component({
  selector: 'app-registartion-form',
  templateUrl: './registartion-form.component.html',
  styleUrls: ['./registartion-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RegistartionFormComponent implements OnInit, OnDestroy {
  isSubmitting$: Observable<boolean> = this.store.pipe(select(isSubmittingSelector));
  backendError$: Observable<AuthError | null> = this.store.pipe(select(backendErrorSelector));
  isSubmitFormButtonDisable = false;
  subscriptions: Subscription[] = [];

  constructor(
    private store: Store,
    public signUpService: SignUpService,
  ) {}

  ngOnInit(): void {
    this.store.dispatch(sighUpResetAction());
    this.initFormValueChanges();
  }

  initFormValueChanges(): void {
    const formValueChangesSubscription =
      this.signUpService.registrationForm.valueChanges.subscribe(() => {
        this.isSubmitFormButtonDisable = false;
      });

    this.subscriptions.push(formValueChangesSubscription);
  }

  onSubmit(): void {
    const userData = this.signUpService.registrationForm
      .value as UserSignUpProps;
    this.store.dispatch(sighUpAction({ userData }));
    const backendErrorsSubscr = this.backendError$.subscribe((error) => {
      if (error?.type === AuthErrorsTypes.Duplication)
        this.isSubmitFormButtonDisable = true;
    });
    this.subscriptions.push(backendErrorsSubscr);
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((subscription) => subscription.unsubscribe());
  }
}
