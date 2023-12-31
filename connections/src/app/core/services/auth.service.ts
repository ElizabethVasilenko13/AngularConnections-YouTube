import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { LocalStorageService } from './local-storage.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  isLoggedIn = new BehaviorSubject(false);
  currentUserID = ''
  constructor(private localStorageService: LocalStorageService, private router: Router) {}

  checkAuth(): void {
    if (this.localStorageService.get('userData') !== null) {
      this.isLoggedIn.next(true);
      this.getUserID();
    }
  }

  getUserID(): void {
    this.currentUserID = this.localStorageService.get('userData')?.uid || '';
  }

  handleSignIn(userData: {email: string; token: string; uid: string}): void {
    this.localStorageService.set('userData', userData);
    this.isLoggedIn.next(true);
    this.router.navigate(['/']);
    this.getUserID();
  }
}
