import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { IYouTubeApiItem } from 'src/app/shared/models/search-item.model';
import { MockDataService } from './mockDataService.service';

@Injectable({ providedIn: 'root' })
export class SearchService  {
  public videosSource$ = new BehaviorSubject<IYouTubeApiItem[]>([]);
  public searchTextSource$ = new BehaviorSubject<string>('');

  constructor(private mockDataService: MockDataService) {}

  requestVideos(): void {
    this.mockDataService.getData().subscribe((mockDataVideos) => {
      this.videosSource$.next(mockDataVideos);
    });
  }

  setSearchText(searchText: string): void {
    this.searchTextSource$.next(searchText);
  }

  sortSearchResults(comparator: (a: IYouTubeApiItem, b: IYouTubeApiItem) => number, ascending: boolean): void {
    const currentVideos = this.videosSource$.getValue();
    const sortedVideos = [...currentVideos].sort((a, b) => comparator(a, b) * (ascending ? 1 : -1));
    this.videosSource$.next(sortedVideos);
  }
}
