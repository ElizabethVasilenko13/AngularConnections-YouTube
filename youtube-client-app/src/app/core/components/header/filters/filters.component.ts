import { Component, EventEmitter, Input, Output } from '@angular/core';
import { SortComparator, SortingState } from 'src/app/core/models/sorting.model';
import { SortingService } from 'src/app/core/services/sorting.service';
import { SearchService } from 'src/app/services/searchService.service';

@Component({
  selector: 'app-filters',
  templateUrl: './filters.component.html',
  styleUrls: ['./filters.component.scss'],
})

export class FiltersComponent {
  @Output() sortingFunc = new EventEmitter<SortingState>();
  @Input() sortingState!: SortingState;
  searchText = '';

  constructor(
    private searchService: SearchService,
    public sortingService: SortingService,
  ) {}

  updateSearchText(): void {
    this.searchService.setSearchText(this.searchText);
  }

  isDescSorting(key: string): boolean {
    return this.sortingState.key === key && this.sortingState.order === 'desc';
  }

  isAscSorting(key: string): boolean {
    return this.sortingState.key === key && this.sortingState.order === 'asc';
  }

  onSortClick(key: string, comparator: SortComparator): void {
    const nextSortingOrder = this.isDescSorting(key) ? 'asc' : 'desc';
    const multiplier = this.isDescSorting(key) ? -1 : 1;
    const sortedComparator: SortComparator = (a, b) => comparator(a, b) * multiplier;

    this.sortingState = {
      key,
      order: nextSortingOrder,
      comparator: sortedComparator
    };

    this.sortingFunc.emit(this.sortingState)
  }
}
