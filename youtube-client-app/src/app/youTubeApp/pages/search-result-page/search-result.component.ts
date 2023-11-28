import { Component, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { SortingService } from '@core/services/sorting.service';
import { loadVideos } from '@redux/actions/youtube-api.actions';
import { selectCurrnetPageNumList, selectCustomVideosFeature, selectPageIngoFeature, selectVideosList } from '@redux/selectors/videos.selector';
import { SearchService } from '@services/searchService.service';
import { IYouTubeCustomItem, IYouTubeItem } from '@shared/models/search-item.model';
import { IPaginationPageInfo } from '@shared/models/search-response.model';


@Component({
  selector: 'app-search-result',
  templateUrl: './search-result.component.html',
  styleUrls: ['./search-result.component.scss'],
})
export class SearchResultComponent implements OnDestroy {
  videos$: Observable<IYouTubeItem[]>;
  customVideos$: Observable<IYouTubeCustomItem[]>;
  pageInfo$: Observable<IPaginationPageInfo>;
  currentPageNum$: Observable<number | null>;
  paginationSubscrions: Subscription[] = [];

  constructor(
    public searchService: SearchService,
    private store: Store,
    public sortingService: SortingService,
  ) {
    this.videos$ = store.select(selectVideosList);
    this.customVideos$ = store.select(selectCustomVideosFeature);
    this.pageInfo$ = store.select(selectPageIngoFeature);
    this.currentPageNum$ = store.select(selectCurrnetPageNumList);
  }

  loadNextPage(): void {
    this.paginationSubscrions.push(
      this.pageInfo$.subscribe(({ pageTokens, currentPage }) => {
        const nextPageToken = pageTokens?.nextPageToken;
        if (nextPageToken && currentPage) {
          this.store.dispatch(loadVideos({ pageToken: nextPageToken, currentPage: currentPage + 1 }));
        }
      })
    )
  }

  loadPrevPage(): void {
    this.paginationSubscrions.push(
      this.pageInfo$.subscribe(({ pageTokens, currentPage }) => {
        const prevPageToken = pageTokens?.prevPageToken;
        if (prevPageToken && currentPage) {
          this.store.dispatch(loadVideos({ pageToken: prevPageToken, currentPage: currentPage - 1 }));
        }
      })
    )
  }

  ngOnDestroy(): void {
    this.paginationSubscrions.forEach((subscription) => {
      subscription.unsubscribe();
    });
  }
}
