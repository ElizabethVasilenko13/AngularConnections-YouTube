import { HttpBackend, HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@env/environment';
import { Observable } from 'rxjs';
import { SignInResponse, UserSignInProps, UserSignUpProps } from '../models/auth';

@Injectable()
export class SignUpService {
  private http: HttpClient;

  constructor( handler: HttpBackend) {
    this.http = new HttpClient(handler);
  }

  signUp(data: UserSignUpProps): Observable<null> {
    const url = `${environment.apiUrl}registration`;
    return this.http.post<null>(url, data);
  }

  signIn(data: UserSignInProps): Observable<SignInResponse> {
    const url = `${environment.apiUrl}login`;
    return this.http.post<SignInResponse>(url, data);
  }
}
