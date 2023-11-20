import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MAIN_PAGE_ROUTE } from '@core/consts';
import { LoggerService } from '@core/services/logger.service';
import { FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '@services/auth.service';
import { passwordStrengthValidator } from '@shared/validators/password-strength';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss'],
})
export class LoginPageComponent implements OnInit {
  constructor(
    private auth: AuthService,
    private router: Router,
    private logger: LoggerService,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    if (this.auth.isLoggedIn.value) {
      this.router.navigate([MAIN_PAGE_ROUTE]);
    }
  }

  loginForm = this.fb.group({
    login: ['', [ Validators.required, Validators.email ]],
    password: ['', [ Validators.required, passwordStrengthValidator()]]
  });

  onSubmit(): void {
    this.auth.login();
    this.router.navigate(['/main']);
    this.logger.logMessage('Login');
  }
}
