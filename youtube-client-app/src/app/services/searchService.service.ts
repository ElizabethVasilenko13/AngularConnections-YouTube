import { Injectable, OnDestroy } from '@angular/core';
import { BehaviorSubject, Subscription } from 'rxjs';
import { SortingState } from '@core/models/sorting.model';
import { IYouTubeApiItem } from '@shared/models/search-item.model';
import { YoutubeService } from './youtubeService.service';


@Injectable({ providedIn: 'root' })
export class SearchService implements OnDestroy {
  public videosSource$ = new BehaviorSubject<IYouTubeApiItem[]>([]);
  public filterTextSource$ = new BehaviorSubject<string>('');
  public sortingStateSource$ = new BehaviorSubject<SortingState>({
    key: '',
    order: '',
    comparator: (): number => 0,
  });
  private getVideosSubscription: Subscription = new Subscription();

  constructor(private youtubeService: YoutubeService) {}

  requestVideos(seachTerm: string): void {
    this.getVideosSubscription = this.youtubeService.getVideos(seachTerm).subscribe((videosData) => {
      this.videosSource$.next(videosData);
    })
  }

  setSortingState(sortingState: SortingState): void {
    this.sortingStateSource$.next(sortingState);
  }

  setFilterText(searchText: string): void {
    this.filterTextSource$.next(searchText);
  }

  ngOnDestroy(): void {
    this.getVideosSubscription.unsubscribe()
  }
}
