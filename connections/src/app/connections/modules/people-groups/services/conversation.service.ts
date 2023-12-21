import { Injectable } from '@angular/core';
import { ConverastionMessagesResponse } from '../models/conversation';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '@env/environment';

@Injectable({
  providedIn: 'root'
})
export class ConversationService {

  constructor(private http: HttpClient) { }

  loadAllMesages(conversationID: string): Observable<ConverastionMessagesResponse> {
    const url = `${environment.apiUrl}conversations/read?conversationID=${conversationID}`;
    return this.http.get<ConverastionMessagesResponse>(url);
  }

  postNewMessage(conversationID: string, message: string): Observable<null> {
    const url = `${environment.apiUrl}conversations/append`;
    const body = {
      conversationID, message
    }
    return this.http.post<null>(url, body);
  }

  deleteConversation(conversationID: string): Observable<null> {
    const url = `${environment.apiUrl}conversations/read?conversationID=${conversationID}`;
    return this.http.delete<null>(url);
  }
}
