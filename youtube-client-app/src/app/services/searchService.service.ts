import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { IYouTubeApiItem } from 'src/app/shared/models/search-item.model';
import { MockDataService } from './mockDataService.service';
import { SortingState } from '../core/models/sorting.model';

@Injectable({ providedIn: 'root' })
export class SearchService  {
  public videosSource$ = new BehaviorSubject<IYouTubeApiItem[]>([]);
  public filterTextSource$ = new BehaviorSubject<string>('');
  public sortingStateSource$ = new BehaviorSubject<SortingState>({
    key: '',
    order: '',
    comparator: (): number => 0,
  });

  constructor(private mockDataService: MockDataService) {}

  requestVideos(): void {
    this.mockDataService.getData().subscribe((mockDataVideos) => {
      const sortedVideos = mockDataVideos.slice().sort(this.sortingStateSource$.value.comparator);
      this.videosSource$.next(sortedVideos);
    });
  }

  setSortingState(sortingState: SortingState): void {
    this.sortingStateSource$.next(sortingState);
  }

  setFilterText(searchText: string): void {
    this.filterTextSource$.next(searchText);
  }
}
