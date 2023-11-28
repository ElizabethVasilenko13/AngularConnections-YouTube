import { Injectable } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AUTH_PAGE_ROUTE } from '@core/consts';
import { passwordStrengthValidator } from '@shared/validators/password-strength';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  isLoggedIn = new BehaviorSubject(false);

  constructor(
    private router: Router,
    private fb: FormBuilder,
  ) {}

  loginForm = this.fb.group({
    login: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, passwordStrengthValidator()]],
  });

  get login(): FormControl<string | null> {
    return this.loginForm.controls.login;
  }

  setToken(token: string): void {
    localStorage.setItem('token', token);
    if (this.login.value) localStorage.setItem('login', this.login.value);
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  getLogin(): string | null {
    return localStorage.getItem('login');
  }

  checkAuth(): void {
    if (this.getToken() !== null) {
      this.isLoggedIn.next(true);
      this.loginForm.setValue({
        login: this.getLogin(),
        password: '',
      });
    }
  }

  onLogin(): void {
    this.isLoggedIn.next(true);
    this.setToken('abcdefghi');
  }

  logout(): void {
    this.isLoggedIn.next(false);
    localStorage.clear();
    this.loginForm.setValue({
      login: '',
      password: '',
    });
    this.router.navigate([AUTH_PAGE_ROUTE]);
  }
}
