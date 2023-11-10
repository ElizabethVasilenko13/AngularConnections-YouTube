import { Component } from '@angular/core';
import { SearchService } from '../../../services/searchService.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})

export class HeaderComponent {
  isSortingBlockVisible = false;

  constructor(private searchService: SearchService) {}

  toggleShowSortBtn(): void {
    this.isSortingBlockVisible = !this.isSortingBlockVisible;
  }

  handleSearchBtn(): void {
    this.searchService.showSearchResult();
  }
}
