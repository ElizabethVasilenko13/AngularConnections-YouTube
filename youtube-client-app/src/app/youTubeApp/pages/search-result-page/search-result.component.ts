import { Component } from '@angular/core';
import { SortingService } from '@core/services/sorting.service';
import { SearchService } from '@services/searchService.service';

@Component({
  selector: 'app-search-result',
  templateUrl: './search-result.component.html',
  styleUrls: ['./search-result.component.scss'],
})
export class SearchResultComponent {
  constructor(
    public searchService: SearchService,
    public sortingService: SortingService
  ) {}
}
