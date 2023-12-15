import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store, select } from '@ngrx/store';
import {
  sighUpAction,
  sighUpResetAction,
} from '../../store/signup/signup.actions';
import { Observable } from 'rxjs';
import {
  backendErrorSelector,
  isSubmittingSelector,
} from '../../store/signup/signup.selectors';
import { SignUpErrorsTypes } from '../../models/auth.enum';
import { UserSignUpProps } from '../../models/auth';
import { AuthError } from '@shared/types/user';

@Component({
  selector: 'app-registration-page',
  templateUrl: './registration-page.component.html',
  styleUrls: ['./registration-page.component.scss'],
})
export class RegistrationPageComponent implements OnInit {
  registrationForm!: FormGroup;
  isSubmitting$!: Observable<boolean>;
  backendError$!: Observable<AuthError | null>;
  userEmail$?: Observable<string>;
  hasBackendError = false;

  constructor(
    private fb: FormBuilder,
    private store: Store,
  ) {}

  ngOnInit(): void {
    this.initForm();
    this.initValues();
  }

  initValues(): void {
    this.store.dispatch(sighUpResetAction());
    this.isSubmitting$ = this.store.pipe(select(isSubmittingSelector));
    this.backendError$ = this.store.pipe(select(backendErrorSelector));
    this.registrationForm.get('email')?.valueChanges.subscribe((emailValue) => {
      if (emailValue) this.hasBackendError = false;
    });
  }

  initForm(): void {
    this.registrationForm = this.fb.group({
      name: [
        '',
        [
          Validators.required,
          Validators.maxLength(40),
          Validators.pattern(/^[a-zA-Z\s]+$/),
        ],
      ],
      email: ['', [Validators.required, Validators.email]],
      password: [
        '',
        [
          Validators.required,
          Validators.minLength(8),
          Validators.pattern(
            /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+])[A-Za-z\d!@#$%^&*()_+]+$/,
          ),
        ],
      ],
    });
  }

  onSubmit(): void {
    const userData = this.registrationForm.value as UserSignUpProps;
    this.store.dispatch(sighUpAction({ userData }));
    this.backendError$.subscribe((error) => {
      if (error?.type === SignUpErrorsTypes.Duplication)
        this.hasBackendError = true;
    });
  }
}
