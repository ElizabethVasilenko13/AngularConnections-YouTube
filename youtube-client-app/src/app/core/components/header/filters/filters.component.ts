import { Component } from '@angular/core';
import { SortComparator } from '@core/models/sorting.model';
import { SortingService } from '@core/services/sorting.service';
import { SearchService } from '@services/searchService.service';

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

  updateFilterSearchText(): void {
    this.searchService.setFilterText(this.searchText);
  }

  onSortClick(key: string, comparator: SortComparator): void {
    const order = this.sortingService.isDescSorting(key) ? 'asc' : 'desc';
    const sortedComparator = this.getSortedComparator(comparator, order);

    this.searchService.setSortingState({ key, order, comparator: sortedComparator });
    this.searchService.requestVideos();
  }

  private getSortedComparator(comparator: SortComparator, order: string): SortComparator {
    const multiplier = order === 'desc' ? -1 : 1;
    return (a, b) => comparator(a, b) * multiplier;
  }
}
