import { Component, EventEmitter, Output } from '@angular/core';
import { AuthService } from 'src/app/auth/services/auth.service';
import { SearchService } from 'src/app/services/searchService.service';
import { SortComparator, SortingState } from '../../models/sorting.model';
import { SortingService } from '../../services/sorting.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})

export class HeaderComponent {
  isSortingBlockVisible = false;

  sortingState: SortingState = {
    key: '',
    order: '',
    comparator: () => 0,
  };

  @Output() filterPanel = new EventEmitter<SortComparator>();

  constructor(
    private searchService: SearchService,
    public sortingService: SortingService,
    private auth: AuthService
  ) {}

  toggleShowFiltersBtn(): void {
    this.isSortingBlockVisible = !this.isSortingBlockVisible;
  }

  logout(): void {
    this.auth.logout();
  }

  onSortResults(sortingState: SortingState): void {
    this.filterPanel.emit(sortingState.comparator);
  }

  updateSearchText(searchText: string): void {
    this.searchService.setSearchText(searchText);
  }

}
