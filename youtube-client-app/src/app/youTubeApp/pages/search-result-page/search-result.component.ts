import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { SortingService } from '@core/services/sorting.service';
import { Store } from '@ngrx/store';
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
export class SearchResultComponent {
  videos$: Observable<IYouTubeItem[]>;
  customVideos$: Observable<IYouTubeCustomItem[]>;
  pageInfo$: Observable<IPaginationPageInfo>;
  currentPageNum$: Observable<number | null>;

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
    this.pageInfo$.subscribe((pageInfo) => {
      if (pageInfo && pageInfo.pageTokens.nextPageToken) {
        if( pageInfo.currentPage )
        this.store.dispatch(loadVideos({ pageToken: pageInfo.pageTokens.nextPageToken, currentPage: pageInfo.currentPage + 1 }));
      }
    });
  }

  loadPrevPage(): void {
    this.pageInfo$.subscribe((pageInfo) => {
      if (pageInfo && pageInfo.pageTokens.prevPageToken) {
        if( pageInfo.currentPage )
        this.store.dispatch(loadVideos({ pageToken: pageInfo.pageTokens.prevPageToken, currentPage: pageInfo.currentPage - 1}));
      }
    });
  }
}
