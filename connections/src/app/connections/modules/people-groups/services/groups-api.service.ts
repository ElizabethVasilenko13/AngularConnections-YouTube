import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { GroupApiProps, GroupsResponse } from '../models/groups';
import { environment } from '@env/environment';
import { GroupMessagesResponse } from '../models/group-dialog';

@Injectable()
export class GroupsApiService {
  isCreateGroupModalClosed = new BehaviorSubject(false);

  private readonly GROUPS_API_URL = `${environment.apiUrl}groups/`;

  private readonly GROUPS_LIST_ENDPOINT = 'list';
  private readonly GROUPS_CREATE_ENDPOINT = 'create';
  private readonly GROUPS_DELETE_ENDPOINT = 'delete';
  private readonly GROUPS_READ_ENDPOINT = 'read';
  private readonly GROUPS_APPEND_ENDPOINT = 'append';

  constructor(private http: HttpClient) {}

  loadGroups(): Observable<GroupsResponse> {
    const url = `${this.GROUPS_API_URL}${this.GROUPS_LIST_ENDPOINT}`;
    return this.http.get<GroupsResponse>(url);
  }

  createGroup(name: string): Observable<GroupApiProps> {
    const url = `${this.GROUPS_API_URL}${this.GROUPS_CREATE_ENDPOINT}`;
    return this.http.post<GroupApiProps>(url, { name });
  }

  deleteGroup(id: string): Observable<GroupApiProps> {
    const url = `${this.GROUPS_API_URL}${this.GROUPS_DELETE_ENDPOINT}?groupID=${id.trim()}`;
    return this.http.delete<GroupApiProps>(url);
  }

  loadAllMesages(groupID: string, since?: number): Observable<GroupMessagesResponse> {
    const sinceTime = since ? `&since=${since}` : '';
    const url = `${this.GROUPS_API_URL}${this.GROUPS_READ_ENDPOINT}?groupID=${groupID}${sinceTime}`;
    return this.http.get<GroupMessagesResponse>(url);
  }

  postNewMessage(groupID: string, message: string): Observable<null> {
    const url = `${this.GROUPS_API_URL}${this.GROUPS_APPEND_ENDPOINT}`;
    const body = {
      groupID,
      message,
    };
    return this.http.post<null>(url, body);
  }
}
