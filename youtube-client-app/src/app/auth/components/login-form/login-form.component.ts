import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AbstractControl, FormBuilder, Validators } from '@angular/forms';
import { passwordStrengthValidator } from 'src/app/shared/validators/password-strength';
import { LoggerService } from 'src/app/core/services/logger.service';
import { AuthService } from '@services/auth.service';


@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss']
})
export class LoginFormComponent {
  constructor(
    private auth: AuthService,
    private router: Router,
    private logger: LoggerService,
    private fb: FormBuilder) {}

  loginForm = this.fb.group({
    login: ['', [ Validators.required, Validators.email ]],
    password: ['', [ Validators.required, passwordStrengthValidator()]]
  });

  get login(): AbstractControl | null {
    return this.loginForm.get('login');
  }

  get password(): AbstractControl | null {
    return this.loginForm.get('password');
  }

  isInvalid(control: AbstractControl | null): boolean {
    return !!control && control.invalid && (control.dirty || control.touched);
  }

  hasError(control: AbstractControl | null, error: string): boolean {
    return !!control && control.hasError(error);
  }

  onSubmit(): void {
    this.auth.login();
    this.router.navigate(['/main']);
    this.logger.logMessage('Login');
  }
}
