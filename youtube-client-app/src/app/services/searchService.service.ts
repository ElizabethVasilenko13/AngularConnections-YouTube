import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { IYouTubeApiItem } from '@shared/models/search-item.model';

@Injectable({ providedIn: 'root' })
export class SearchService {
  public filterTextSource$ = new BehaviorSubject<string>('');

  setFilterText(searchText: string): void {
    this.filterTextSource$.next(searchText);
  }
}
