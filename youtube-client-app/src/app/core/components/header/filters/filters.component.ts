import { Component } from '@angular/core';
import { SortingService } from 'src/app/core/services/sorting.service';
import { SearchService } from 'src/app/services/searchService.service';
import { IYouTubeApiItem } from 'src/app/shared/models/search-item.model';

@Component({
  selector: 'app-filters',
  templateUrl: './filters.component.html',
  styleUrls: ['./filters.component.scss'],
})

export class FiltersComponent {
  searchText = '';

  constructor(
    private searchService: SearchService,
    public sortingService: SortingService,
  ) {}

  updateSearchText(): void {
    this.searchService.setSearchText(this.searchText);
  }

  sortResults(key: string, comparator: (a: IYouTubeApiItem, b: IYouTubeApiItem) => number): void {
    const ascending = this.sortingService.activeSortDirection === 'asc';
    this.searchService.sortSearchResults(comparator, ascending);
    this.sortingService.toggleSortDirection();
    this.sortingService.activeSortKey = key;
  }
}
