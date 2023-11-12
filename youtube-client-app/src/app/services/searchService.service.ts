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
}
