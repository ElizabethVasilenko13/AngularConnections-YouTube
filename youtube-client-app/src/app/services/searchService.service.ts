import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class SearchService {
  public filterTextSource$ = new BehaviorSubject<string>('');

  setFilterText(searchText: string): void {
    this.filterTextSource$.next(searchText);
  }
}
