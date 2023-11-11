import { Component } from '@angular/core';
import { SearchService } from 'src/app/services/searchService.service';
import { SortingStateService } from 'src/app/core/services/sortingState.service';


@Component({
  selector: 'app-filters',
  templateUrl: './filters.component.html',
  styleUrls: ['./filters.component.scss'],
})

export class FiltersComponent {
  searchText = '';

  constructor(
    private searchService: SearchService,
    private sortingStateService: SortingStateService,
  ) {}

  updateSearchText(): void {
    this.searchService.setSearchText(this.searchText);
  }

  isClassActive(key: 'date' | 'views', ascending: boolean): boolean {
    return key === this.sortingStateService.activeSortKey
      && ascending === this.sortingStateService.activeSortDirection;
  }

  sortResults(key: 'date' | 'views', ascending: boolean): void {
    this.searchService.sortSearchResults(key, ascending);
    this.sortingStateService.activeSortKey = key;
    this.sortingStateService.activeSortDirection = ascending;
  }
}
