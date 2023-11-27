import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AUTH_PAGE_ROUTE } from '@core/consts';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  isLoggedIn = new BehaviorSubject(false);
  constructor(private router: Router) {}

  setToken(token: string): void {
    localStorage.setItem('token', token);
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  checkAuth(): void {
    if (this.getToken() !== null) {
      this.isLoggedIn.next(true);
    }
  }

  logout(): void {
    this.isLoggedIn.next(false);
    localStorage.removeItem('token');
    this.router.navigate([AUTH_PAGE_ROUTE]);
  }

  login(): void {
    this.isLoggedIn.next(true);
    this.setToken('abcdefghi');
  }
}
