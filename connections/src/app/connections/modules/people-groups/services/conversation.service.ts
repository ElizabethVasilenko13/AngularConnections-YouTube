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
    const url = `${environment.apiUrl}conversations/read?conversationID=${conversationID}&since=${0}`;
    return this.http.get<ConverastionMessagesResponse>(url);
  }

  deleteConversation(conversationID: string): Observable<null> {
    const url = `https://tasks.app.rs.school/angular/conversations/read?conversationID=6wdgthaa19p&since=0`;
    return this.http.delete<null>(url);
  }
}
