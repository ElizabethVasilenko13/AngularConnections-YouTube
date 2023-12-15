import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@env/environment';
import { Observable } from 'rxjs';
import { UserResponseInterface } from 'src/app/connections/models/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  constructor(private http: HttpClient) { }

  loadUser(): Observable<UserResponseInterface> {
    const url = `${environment.apiUrl}profile`;
    return this.http.get<UserResponseInterface>(url);
  }

  updateUser(name: string): Observable<null> {
    const url = `${environment.apiUrl}profile`;
    const body = { name: name };
    return this.http.put<null>(url, body);
  }
}
