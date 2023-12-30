import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import {
  sighUpAction,
  sighUpResetAction,
} from '../../store/signup/signup.actions';
import { Observable, Subscription } from 'rxjs';
import {
  backendErrorSelector,
  isSubmittingSelector,
} from '../../store/signup/signup.selectors';
import { UserSignUpProps } from '../../models/auth.interfaces';
import { AuthError } from '@shared/types/user';
import { SignUpService } from '@auth/services/sign-up.service';
import { AuthErrorsTypes } from '@auth/models/auth.enum';

@Component({
  selector: 'app-registration-page',
  templateUrl: './registration-page.component.html',
  styleUrls: ['./registration-page.component.scss'],
})
export class RegistrationPageComponent implements OnInit, OnDestroy {
  isSubmitting$!: Observable<boolean>;
  backendError$!: Observable<AuthError | null>;
  userEmail$?: Observable<string>;
  isSubmitFormButtonDisable = false;
  subscriptions: Subscription[] = [];

  constructor(
    private store: Store,
    public signUpService: SignUpService
  ) {}

  ngOnInit(): void {
    this.signUpService.initForm();
    this.initValues();
    this.initFormValueChanges();
  }

  initValues(): void {
    this.store.dispatch(sighUpResetAction());
    this.isSubmitting$ = this.store.pipe(select(isSubmittingSelector));
    this.backendError$ = this.store.pipe(select(backendErrorSelector));
  }

  initFormValueChanges(): void {
    const formValueChangesSubscription = this.signUpService.registrationForm.valueChanges.subscribe(
      () => {
      this.isSubmitFormButtonDisable = false;
    });

    this.subscriptions.push(formValueChangesSubscription);
  }

  onSubmit(): void {
    const userData = this.signUpService.registrationForm.value as UserSignUpProps;
    this.store.dispatch(sighUpAction({ userData }));
    const backendErrorsSubscr =  this.backendError$.subscribe((error) => {
      if (error?.type === AuthErrorsTypes.Duplication)
        this.isSubmitFormButtonDisable = true;
    });

    this.subscriptions.push(backendErrorsSubscr);
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(subscription => subscription.unsubscribe());
  }
}
