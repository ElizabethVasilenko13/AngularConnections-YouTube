import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { IYouTubeApiItem } from 'src/app/shared/models/search-item.model';
import { MockDataService } from './mockDataService.service';

@Injectable()
export class DataSharingService {
  private isSortingVisibleSource = new BehaviorSubject<boolean>(false);
  private videosSource = new BehaviorSubject<IYouTubeApiItem[]>([]);
  private searchTextSource = new BehaviorSubject<string>('');

  isSortingVisible$ = this.isSortingVisibleSource.asObservable();
  videos$ = this.videosSource.asObservable();
  searchInputText$ = this.searchTextSource.asObservable();

  constructor(private mockDataService: MockDataService) {
    const mockDataVideos = this.mockDataService.getData();
    this.videosSource.next(mockDataVideos);
  }

  showSearchResult() {
    this.isSortingVisibleSource.next(true);
  }

  setSearchText(searchText: string) {
    this.searchTextSource.next(searchText);
  }
}
