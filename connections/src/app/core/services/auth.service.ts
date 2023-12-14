import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { LocalStorageService } from './local-storage.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  isLoggedIn = new BehaviorSubject(false);
  constructor( private localStorageService: LocalStorageService) {}

  checkAuth(): void {
    if (this.localStorageService.get('userData') !== null) {
      console.log(this.localStorageService.get('userData'));
      console.log('check');
      this.isLoggedIn.next(true);
    }
  }
}
