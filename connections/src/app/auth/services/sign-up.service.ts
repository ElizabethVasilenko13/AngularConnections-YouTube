import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { environment } from '@env/environment';
import { UserSignUpProps } from '@shared/types/user';
import { Observable } from 'rxjs';
import { NotifyStyles } from '../models/auth.enum';

@Injectable()
export class SignUpService {
  constructor(private http: HttpClient, private snackBar: MatSnackBar) {}

  signUp(data: UserSignUpProps): Observable<null> {
    const url = `${environment.apiUrl}registration`;
    return this.http.post<null>(url, data);
  }

  openSnackBar(message = 'ERROR', statusStyle = NotifyStyles.Success): void {
    this.snackBar.open(message, 'Close', {
      duration: 3000,
      horizontalPosition: 'end',
      verticalPosition: 'bottom',
      panelClass: ['custom-snackbar', statusStyle],
    });
  }
}
