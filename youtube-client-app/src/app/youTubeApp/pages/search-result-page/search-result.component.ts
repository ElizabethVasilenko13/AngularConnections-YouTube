import { Component } from '@angular/core';
import { SortingService } from '@core/services/sorting.service';
import { Store } from '@ngrx/store';
import { selectVideoList } from '@redux/selectors/videos.selector';
import { SearchService } from '@services/searchService.service';
import { IYouTubeItem } from '@shared/models/search-item.model';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-search-result',
  templateUrl: './search-result.component.html',
  styleUrls: ['./search-result.component.scss'],
})
export class SearchResultComponent {
  videos$: Observable<IYouTubeItem[]>;

  constructor(
    public searchService: SearchService,
    private store: Store,
    public sortingService: SortingService,
  ) {
    this.videos$ = store.select(selectVideoList);
  }
}
