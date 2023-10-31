import { Component } from '@angular/core';
import { DataSharingService } from 'src/app/shared/services/dataSharingService.service';
import { SortingStateService } from '../../services/sortingState.service';

@Component({
  selector: 'app-sorting',
  templateUrl: './sorting.component.html',
  styleUrls: ['./sorting.component.scss']
})

export class SortingComponent {
  searchText = '';

  constructor(
    private dataSharingService: DataSharingService,
    private sortingStateService: SortingStateService
  ) {}

  updateSearchText() {
    this.dataSharingService.setSearchText(this.searchText);
  }

  isClassActive(key: 'date' | 'views', ascending: boolean): boolean {
    return key === this.sortingStateService.activeSortKey
      && ascending === this.sortingStateService.activeSortDirection;
  }

  sortResults(key: 'date' | 'views', ascending: boolean) {
    this.dataSharingService.sortSearchResults(key, ascending);
    this.sortingStateService.activeSortKey = key;
    this.sortingStateService.activeSortDirection = ascending;
  }
}
