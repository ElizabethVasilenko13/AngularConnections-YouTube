import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {
  ConverastionMessagesResponse,
  ConversationsResponse,
  CreateConversationsResponse,
  UsersResponse,
} from '../models/users';
import { environment } from '@env/environment';

@Injectable()
export class UsersApiService {
  constructor(private http: HttpClient) {}

  loadUsers(): Observable<UsersResponse> {
    const url = `${environment.apiUrl}users`;
    return this.http.get<UsersResponse>(url);
  }

  loadConversations(): Observable<ConversationsResponse> {
    const url = `${environment.apiUrl}conversations/list`;
    return this.http.get<ConversationsResponse>(url);
  }

  createConversation(
    companionId: string,
  ): Observable<CreateConversationsResponse> {
    const url = `${environment.apiUrl}conversations/create`;
    const body = { companion: companionId };
    return this.http.post<CreateConversationsResponse>(url, body);
  }

  loadConversation(
    conversationID: string,
    since?: number,
  ): Observable<ConverastionMessagesResponse> {
    const sinceTime = since ? `&since=${since}` : '';
    const url = `${environment.apiUrl}conversations/read?conversationID=${conversationID}${sinceTime}`;
    return this.http.get<ConverastionMessagesResponse>(url);
  }

  deleteConversation(conversationID: string): Observable<null> {
    const url = `${environment.apiUrl}conversations/delete?conversationID=${conversationID}`;
    return this.http.delete<null>(url);
  }

  postNewMessage(conversationID: string, message: string): Observable<null> {
    const url = `${environment.apiUrl}conversations/append`;
    const body = {
      conversationID,
      message,
    };
    return this.http.post<null>(url, body);
  }
}
