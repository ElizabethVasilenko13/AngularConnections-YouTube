import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { SortingState } from '@core/models/sorting.model';
import { IYouTubeApiItem } from '@shared/models/search-item.model';
import { YoutubeService } from './youtubeService.service';


@Injectable({ providedIn: 'root' })
export class SearchService {
  public videosSource$ = new BehaviorSubject<IYouTubeApiItem[]>([]);
  public filterTextSource$ = new BehaviorSubject<string>('');
  public sortingStateSource$ = new BehaviorSubject<SortingState>({
    key: '',
    order: '',
    comparator: (): number => 0,
  });

  constructor(private youtubeService: YoutubeService) {}

  requestVideos(): void {
    this.youtubeService.getVideos().subscribe({
      next: (mockDataVideos) => {
        console.log(mockDataVideos);
        const sortedVideos = mockDataVideos.slice().sort(this.sortingStateSource$.value.comparator);
        this.videosSource$.next(sortedVideos);
      }
    })
    this.youtubeService.getVideoInfo('7whYyy7ssJ8').subscribe({
      next: (mockDataVideos) => {
        console.log(mockDataVideos);
      }
    })
  }

  setSortingState(sortingState: SortingState): void {
    this.sortingStateSource$.next(sortingState);
  }

  setFilterText(searchText: string): void {
    this.filterTextSource$.next(searchText);
  }
}
