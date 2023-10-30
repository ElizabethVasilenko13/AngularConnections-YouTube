import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { IYouTubeApiItem } from 'src/app/models/search-item.model';
import { MockDataService } from './mockDataService.service';

@Injectable()
export class DataSharingService {
  private isSortingVisibleSource = new BehaviorSubject<boolean>(false);
  private videosSource = new BehaviorSubject<IYouTubeApiItem[]>([]);

  isSortingVisible$ = this.isSortingVisibleSource.asObservable();
  videos$ = this.videosSource.asObservable();

  constructor(private mockDataService: MockDataService) {
    const mockDataVideos = this.mockDataService.getData();
    this.videosSource.next(mockDataVideos);
  }

  showSearchResult() {
    this.isSortingVisibleSource.next(true);
  }
}
