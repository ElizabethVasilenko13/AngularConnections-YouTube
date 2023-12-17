import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ConversationsResponse, CreateConversationsResponse, UsersResponse } from '../models/users';
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

  createConversation(companionId: string): Observable<CreateConversationsResponse> {
    const url = `${environment.apiUrl}conversations/create`;
    const body = {companion: companionId}
    return this.http.post<CreateConversationsResponse>(url, body);
  }
}
