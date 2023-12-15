import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@env/environment';
import { Observable } from 'rxjs';
import { UserProfileProps, UserResponseInterface } from 'src/app/connections/models/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  loadUser(userData: UserProfileProps): Observable<UserResponseInterface> {
    const url = `${environment.apiUrl}profile`;
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${userData.token}`,
      'rs-uid': userData.uid,
      'rs-email': userData.email,
    });

    return this.http.get<UserResponseInterface>(url, { headers });
  }
}
