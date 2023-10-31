import { Component } from '@angular/core';
import { DataSharingService } from 'src/app/shared/services/dataSharingService.service';

@Component({
  selector: 'app-sorting',
  templateUrl: './sorting.component.html',
  styleUrls: ['./sorting.component.scss']
})

export class SortingComponent {
  searchText = '';
  activeSortKey: 'date' | 'views' | null = null;
  activeSortDirection: boolean | null = null;
  constructor(private dataSharingService: DataSharingService) {}

  updateSearchText() {
    this.dataSharingService.setSearchText(this.searchText);
  }

  isClassActive(key: 'date' | 'views', ascending: boolean): boolean {
    return key === this.activeSortKey && ascending === this.activeSortDirection;
  }

  sortResults(key: 'date' | 'views', ascending: boolean) {
    this.activeSortKey = key;
    this.activeSortDirection = ascending;
    this.dataSharingService.sortSearchResults(key, ascending);
  }
}
