import { Component } from '@angular/core';
import { SortingService } from '@core/services/sorting.service';
import { Store } from '@ngrx/store';
import { loadVideos } from '@redux/actions/youtube-api.actions';
import { selectCurrnetPageNumList, selectCustomVideosFeature, selectPageIngoFeature, selectVideosList } from '@redux/selectors/videos.selector';
import { SearchService } from '@services/searchService.service';
import { IYouTubeCustomItem, IYouTubeItem } from '@shared/models/search-item.model';
import { IpageInfoO } from '@shared/models/search-response.model';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-search-result',
  templateUrl: './search-result.component.html',
  styleUrls: ['./search-result.component.scss'],
})
export class SearchResultComponent {
  videos$: Observable<IYouTubeItem[]>;
  customVideos$: Observable<IYouTubeCustomItem[]>;
  pageInfo$: Observable<IpageInfoO>;
  currentPageNum$: Observable<number>;

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
        this.store.dispatch(loadVideos({ pageToken: pageInfo.pageTokens.nextPageToken }));
      }
    });
  }

  loadPrevPage(): void {
    this.pageInfo$.subscribe((pageInfo) => {
      if (pageInfo && pageInfo.pageTokens.prevPageToken) {
        this.store.dispatch(loadVideos({ pageToken: pageInfo.pageTokens.prevPageToken}));
      }
    });
  }
}
