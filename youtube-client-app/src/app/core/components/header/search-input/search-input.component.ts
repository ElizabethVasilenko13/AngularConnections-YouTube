import { Component, EventEmitter, Output } from '@angular/core';
import { SearchService } from 'src/app/services/searchService.service';

@Component({
  selector: 'app-search-input',
  templateUrl: './search-input.component.html',
  styleUrls: ['./search-input.component.scss']
})
export class SearchInputComponent {

  @Output() showFilters: EventEmitter<boolean> = new EventEmitter<boolean>();

  constructor(private searchService: SearchService) {}

  toggleFiltersBtn(): void {
    this.showFilters.emit(true);
  }

  handleSearchBtn(): void {
    this.searchService.requestVideos();
  }
}
