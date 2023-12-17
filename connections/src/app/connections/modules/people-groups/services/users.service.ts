import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ConversationsResponse, UsersResponse } from '../models/users';
import { environment } from '@env/environment';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(private http: HttpClient) { }

  loadUsers(): Observable<UsersResponse> {
    const url = `${environment.apiUrl}users`;
    return this.http.get<UsersResponse>(url);
  }

  loadConversation(): Observable<ConversationsResponse> {
    const url = `${environment.apiUrl}conversations/list`;
    return this.http.get<ConversationsResponse>(url);
  }
}
