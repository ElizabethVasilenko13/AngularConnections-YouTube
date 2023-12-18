import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { GroupMessagesResponse } from '../models/group-dialog';
import { environment } from '@env/environment';

@Injectable({
  providedIn: 'root'
})
export class GroupDialogService {

  constructor(private http: HttpClient) { }

  loadAllMesages(groupID: string): Observable<GroupMessagesResponse> {
    const url = `${environment.apiUrl}groups/read?groupID=${groupID}`;
    return this.http.get<GroupMessagesResponse>(url);
  }
}
