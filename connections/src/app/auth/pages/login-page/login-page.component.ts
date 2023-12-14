import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { UserAuthError, UserSignInProps } from '../../models/auth';
import { Store, select } from '@ngrx/store';
import { backendSignInErrorSelector, isSubmittingSignInSelector } from '../../store/signin/signin.selectors';
import { sighInAction, sighInResetAction } from '../../store/signin/signin.actions';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss'],
})
export class LoginPageComponent implements OnInit {
  loginForm!: FormGroup;
  isSubmitting$!: Observable<boolean>;
  backendError$!: Observable<UserAuthError | null>;
  // userEmail$?: Observable<string>;
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
    this.store.dispatch(sighInResetAction());

    this.isSubmitting$ = this.store.pipe(select(isSubmittingSignInSelector));
    this.backendError$ = this.store.pipe(select(backendSignInErrorSelector));
    // this.userEmail$ = this.store.pipe(select(authEmailSelector));
    // this.registrationForm.get('email')?.valueChanges.subscribe((emailValue) => {
    //   if (emailValue) this.hasBackendError = false;
    // });
  }

  initForm(): void {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: [
        '', [ Validators.required],
      ],
    });
  }

  onSubmit(): void {
    const userData = this.loginForm.value as UserSignInProps;
    this.store.dispatch(sighInAction({ userData }));
    console.log(userData);
    
    // this.backendError$.subscribe((error) => {
    //   if (error?.type === SignUpErrorsTypes.Duplication)
    //     this.hasBackendError = true;
    // });
  }
}
