import { Injectable } from '@angular/core';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
import { LocalStorageService } from '@core/services/local-storage.service';
import { UserProfileProps } from '../../connections/models/user.interfaces';

@Injectable()
export class UserCredentialInterceptor implements HttpInterceptor {
  constructor(private localStorageService: LocalStorageService) {}
  public intercept(req: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const userData: UserProfileProps = this.localStorageService.get('userData');
    const modifiedRequest = req.clone({
      setHeaders: {
        Authorization: `Bearer ${userData.token}`,
        'rs-uid': userData.uid,
        'rs-email': userData.email,
      },
    });
    return next.handle(modifiedRequest);
  }
}
