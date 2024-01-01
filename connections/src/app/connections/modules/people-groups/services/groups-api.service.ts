import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { GroupApiProps, GroupsResponse } from '../models/groups';
import { environment } from '@env/environment';
import { GroupMessagesResponse } from '../models/group-dialog';

@Injectable()
export class GroupsApiService {
  isCreateGroupModalClosed = new BehaviorSubject(false);
  constructor(private http: HttpClient) {}

  loadGroups(): Observable<GroupsResponse> {
    const url = `${environment.apiUrl}groups/list`;
    return this.http.get<GroupsResponse>(url);
  }

  createGroup(name: string): Observable<GroupApiProps> {
    const url = `${environment.apiUrl}groups/create`;
    return this.http.post<GroupApiProps>(url, { name });
  }

  deleteGroup(id: string): Observable<GroupApiProps> {
    const url = `${environment.apiUrl}groups/delete?groupID=${id.trim()}`;
    return this.http.delete<GroupApiProps>(url);
  }

  loadAllMesages(
    groupID: string,
    since?: number,
  ): Observable<GroupMessagesResponse> {
    const sinceTime = since ? `&since=${since}` : '';
    const url = `${environment.apiUrl}groups/read?groupID=${groupID}${sinceTime}`;
    return this.http.get<GroupMessagesResponse>(url);
  }

  postNewMessage(groupID: string, message: string): Observable<null> {
    const url = `${environment.apiUrl}groups/append`;
    const body = {
      groupID,
      message,
    };
    return this.http.post<null>(url, body);
  }
}
