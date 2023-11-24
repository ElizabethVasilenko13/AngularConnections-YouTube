import { Component } from '@angular/core';
import { SortingService } from '@core/services/sorting.service';
import { Store } from '@ngrx/store';
import { SearchService } from '@services/searchService.service';
import { IYouTubeApiItem } from '@shared/models/search-item.model';
import { Observable } from 'rxjs';
import { selectVideos } from '@redux/selectors/videos.selector';

@Component({
  selector: 'app-search-result',
  templateUrl: './search-result.component.html',
  styleUrls: ['./search-result.component.scss'],
})
export class SearchResultComponent {
  videos$: Observable<IYouTubeApiItem[]>;

  constructor(
    public searchService: SearchService,
    private store: Store,
    public sortingService: SortingService,
  ) {
    this.videos$ = store.select(selectVideos);
  }
}
