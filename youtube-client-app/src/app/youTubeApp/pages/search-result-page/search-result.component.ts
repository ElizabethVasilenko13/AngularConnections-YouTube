import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, take } from 'rxjs';
import { SortingService } from '@core/services/sorting.service';
import { selectCurrnetPageNumList,  selectCustomVideos,  selectPageIngo, selectVideoLoading,  selectVideosList } from '@redux/selectors/videos.selector';
import { SearchService } from '@services/searchService.service';
import { IYouTubeCustomItem, IYouTubeItem } from '@shared/models/search-item.model';
import { IPaginationPageInfo } from '@shared/models/search-response.model';
import { loadVideos } from '@redux/actions/videos.actions';

@Component({
  selector: 'app-search-result',
  templateUrl: './search-result.component.html',
  styleUrls: ['./search-result.component.scss'],
})
export class SearchResultComponent {
  videos$: Observable<IYouTubeItem[]>;
  customVideos$: Observable<IYouTubeCustomItem[]>;
  pageInfo$: Observable<IPaginationPageInfo>;
  videoloading$: Observable<boolean>;
  currentPageNum$: Observable<number | null>;

  constructor(
    public searchService: SearchService,
    private store: Store,
    public sortingService: SortingService,
  ) {
    this.videoloading$ = store.select(selectVideoLoading);
    this.videos$ = store.select(selectVideosList);
    this.customVideos$ = store.select(selectCustomVideos);
    this.pageInfo$ = store.select(selectPageIngo);
    this.currentPageNum$ = store.select(selectCurrnetPageNumList);
  }

  loadNextPage(): void {
    this.pageInfo$.pipe(take(1)).subscribe(({ pageTokens, currentPage }) => {
      const nextPageToken = pageTokens?.nextPageToken;
      if (nextPageToken && currentPage) {
        this.store.dispatch(loadVideos({ pageToken: nextPageToken, currentPage: currentPage + 1 }));
      }
    })
  }

  loadPrevPage(): void {
    this.pageInfo$.pipe(take(1)).subscribe(({ pageTokens, currentPage }) => {
      const prevPageToken = pageTokens?.prevPageToken;
      if (prevPageToken && currentPage) {
        this.store.dispatch(loadVideos({ pageToken: prevPageToken, currentPage: currentPage - 1 }));
      }
    })
  }

}
