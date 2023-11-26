import { Component } from '@angular/core';
import { SortingService } from '@core/services/sorting.service';
import { Store } from '@ngrx/store';
import { selectCustomVideosFeature, selectVideosList } from '@redux/selectors/videos.selector';
import { SearchService } from '@services/searchService.service';
import { IYouTubeCustomItem, IYouTubeItem } from '@shared/models/search-item.model';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-search-result',
  templateUrl: './search-result.component.html',
  styleUrls: ['./search-result.component.scss'],
})
export class SearchResultComponent {
  videos$: Observable<IYouTubeItem[]>;
  customVideos$: Observable<IYouTubeCustomItem[]>

  constructor(
    public searchService: SearchService,
    private store: Store,
    public sortingService: SortingService,
  ) {
    this.videos$ = store.select(selectVideosList);
    this.customVideos$ = store.select(selectCustomVideosFeature);
  }
}
