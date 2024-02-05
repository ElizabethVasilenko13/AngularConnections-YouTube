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
  private readonly USERS_API_URL = `${environment.apiUrl}users/`;
  private readonly CONVERSATIONS_API_URL = `${environment.apiUrl}conversations/`;
  private readonly CONVERSATIONS_LIST_ENDPOINT = 'list';
  private readonly CONVERSATIONS_CREATE_ENDPOINT = 'create';
  private readonly CONVERSATIONS_READ_ENDPOINT = 'read';
  private readonly CONVERSATIONS_DELETE_ENDPOINT = 'delete';
  private readonly CONVERSATIONS_APPEND_ENDPOINT = 'append';

  constructor(private http: HttpClient) {}

  loadUsers(): Observable<UsersResponse> {
    const url = this.USERS_API_URL;
    return this.http.get<UsersResponse>(url);
  }

  loadConversations(): Observable<ConversationsResponse> {
    const url = `${this.CONVERSATIONS_API_URL}${this.CONVERSATIONS_LIST_ENDPOINT}`;
    return this.http.get<ConversationsResponse>(url);
  }

  createConversation(companionId: string): Observable<CreateConversationsResponse> {
    const url = `${this.CONVERSATIONS_API_URL}${this.CONVERSATIONS_CREATE_ENDPOINT}`;
    const body = { companion: companionId };
    return this.http.post<CreateConversationsResponse>(url, body);
  }

  loadConversation(
    conversationID: string,
    since?: number,
  ): Observable<ConverastionMessagesResponse> {
    const sinceTime = since ? `&since=${since}` : '';
    const url = `${this.CONVERSATIONS_API_URL}${this.CONVERSATIONS_READ_ENDPOINT}?conversationID=${conversationID}${sinceTime}`;
    return this.http.get<ConverastionMessagesResponse>(url);
  }

  deleteConversation(conversationID: string): Observable<null> {
    const url = `${this.CONVERSATIONS_API_URL}${this.CONVERSATIONS_DELETE_ENDPOINT}?conversationID=${conversationID}`;
    return this.http.delete<null>(url);
  }

  postNewMessage(conversationID: string, message: string): Observable<null> {
    const url = `${this.CONVERSATIONS_API_URL}${this.CONVERSATIONS_APPEND_ENDPOINT}`;
    const body = {
      conversationID,
      message,
    };
    return this.http.post<null>(url, body);
  }
}
