import { Component } from '@angular/core';
import { SearchService } from 'src/app/core/services/searchService.service';
import { SortingStateService } from '../../services/sortingState.service';

@Component({
  selector: 'app-sorting',
  templateUrl: './sorting.component.html',
  styleUrls: ['./sorting.component.scss'],
})

export class SortingComponent {
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
