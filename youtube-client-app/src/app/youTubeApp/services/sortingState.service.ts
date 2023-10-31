import { Injectable } from '@angular/core';

@Injectable()
export class SortingStateService {
  activeSortKey: 'date' | 'views' | null = null;
  activeSortDirection: boolean | null = null;
}
