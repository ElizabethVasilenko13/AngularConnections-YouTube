import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { GroupMessagesResponse } from '../models/group-dialog';
import { environment } from '@env/environment';

@Injectable({
  providedIn: 'root'
})
export class GroupDialogService {

timeServie = new Date().getTime()

  constructor(private http: HttpClient) { }

  loadAllMesages(groupID: string): Observable<GroupMessagesResponse> {
    const url = `${environment.apiUrl}groups/read?groupID=${groupID}`;
    return this.http.get<GroupMessagesResponse>(url);
  }

  postNewMessage(groupID: string, message: string): Observable<null> {
    const url = `${environment.apiUrl}groups/append`;
    const body = {
      groupID, message
    }
    return this.http.post<null>(url, body);
  }

  loadMessageSince(groupID: string, time: number): Observable<GroupMessagesResponse> {
    const url = `${environment.apiUrl}groups/read?groupID=${groupID}&since=${this.timeServie}`;
    return this.http.get<GroupMessagesResponse>(url);
  }
}
