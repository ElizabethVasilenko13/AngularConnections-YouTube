import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { IYouTubeApiItem } from 'src/app/shared/models/search-item.model';
import { MockDataService } from './mockDataService.service';

@Injectable()
export class SearchService  {
  public isSearchResultVisibleSource = new BehaviorSubject<boolean>(false);
  public videosSource = new BehaviorSubject<IYouTubeApiItem[]>([]);
  public searchTextSource = new BehaviorSubject<string>('');

  constructor(private mockDataService: MockDataService) {
    const mockDataVideos = this.mockDataService.getData();
    this.videosSource.next(mockDataVideos);
  }

  showSearchResult(): void {
    this.isSearchResultVisibleSource.next(true);
  }

  setSearchText(searchText: string): void {
    this.searchTextSource.next(searchText);
  }

  sortSearchResults(key: 'date' | 'views', ascending: boolean): void {
    const videos = this.videosSource.getValue().slice();
    videos.sort((a, b) => {
      const valueA = key === 'date' ? new Date(a.snippet.publishedAt).getTime() : +a.statistics.viewCount;
      const valueB = key === 'date' ? new Date(b.snippet.publishedAt).getTime() : +b.statistics.viewCount;
      if (valueA < valueB) {
        return ascending ? -1 : 1;
      } if (valueA > valueB) {
        return ascending ? 1 : -1;
      }
      return 0;
    });
    this.videosSource.next(videos);
  }
}
