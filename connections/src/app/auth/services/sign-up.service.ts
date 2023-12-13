import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { environment } from '@env/environment';
import { Observable } from 'rxjs';
import { NotifyStyles } from '../models/auth.enum';
import { SignInResponse, UserSignInProps, UserSignUpProps } from '../models/auth';

@Injectable()
export class SignUpService {
  constructor(
    private http: HttpClient,
    private snackBar: MatSnackBar,
  ) {}

  signUp(data: UserSignUpProps): Observable<null> {
    const url = `${environment.apiUrl}registration`;
    return this.http.post<null>(url, data);
  }

  signIn(data: UserSignInProps): Observable<SignInResponse> {
    const url = `${environment.apiUrl}login`;
    return this.http.post<SignInResponse>(url, data);
  }

  openSnackBar(message = 'Temporary Server Error', statusStyle = NotifyStyles.Success): void {
    this.snackBar.open(message, 'Close', {
      duration: 3000,
      horizontalPosition: 'end',
      verticalPosition: 'bottom',
      panelClass: ['custom-snackbar', statusStyle],
    });
  }
}
