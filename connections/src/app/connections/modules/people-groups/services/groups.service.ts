import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { GroupApiProps, GroupsResponse } from '../models/groups';
import { environment } from '@env/environment';

@Injectable({
  providedIn: 'root'
})
export class GroupsService {

  constructor(private http: HttpClient) { }

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
}
