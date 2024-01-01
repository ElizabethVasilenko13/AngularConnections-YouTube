import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AUTH_ROUTE, LOGIN_PAGE_ROUTE } from '@core/constants/routing';
import { AuthService } from '@core/services/auth.service';
import { CountdownService } from '@core/services/countdown.service';
import { LocalStorageService } from '@core/services/local-storage.service';
import { environment } from '@env/environment';
import { Observable } from 'rxjs';
import { UserResponseInterface } from 'src/app/connections/models/user.interfaces';

@Injectable()
export class UserService {
  constructor(
    private http: HttpClient,
    private localStorageService: LocalStorageService,
    private router: Router,
    private auth: AuthService,
    private countdownService: CountdownService,
  ) {}

  loadUser(): Observable<UserResponseInterface> {
    const url = `${environment.apiUrl}profile`;
    return this.http.get<UserResponseInterface>(url);
  }

  updateUser(name: string): Observable<null> {
    const url = `${environment.apiUrl}profile`;
    const body = { name: name };
    return this.http.put<null>(url, body);
  }

  logout(): Observable<null> {
    const url = `${environment.apiUrl}logout`;
    return this.http.delete<null>(url);
  }

  handleLogout(): void {
    this.localStorageService.clearStorage();
    this.auth.isLoggedIn.next(false);
    this.clearAllCookies();
    this.countdownService.stopAllCountdowns();
    this.router.navigateByUrl(`/${AUTH_ROUTE}/${LOGIN_PAGE_ROUTE}`);
  }

  clearAllCookies(): void {
    const cookies = document.cookie.split(';');
    for (const cookie of cookies) {
      const eqPos = cookie.indexOf('=');
      const name = eqPos > -1 ? cookie.substring(0, eqPos) : cookie;
      document.cookie = `${name}=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/`;
    }
  }
}
