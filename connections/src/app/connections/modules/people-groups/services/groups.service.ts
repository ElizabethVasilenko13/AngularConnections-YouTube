import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { GroupCreateResponse, GroupsResponse } from '../models/groups';
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

  createGroup(name: string): Observable<GroupCreateResponse> {
    const url = `${environment.apiUrl}groups/create`;
    return this.http.post<GroupCreateResponse>(url, { name });
  }
}
