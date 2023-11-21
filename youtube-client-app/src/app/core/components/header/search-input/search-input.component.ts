
import { Component, EventEmitter, Output, OnInit } from '@angular/core';
import { SearchService } from '@services/searchService.service';
import {
  debounceTime, distinctUntilChanged, filter
} from 'rxjs/operators';
import { YoutubeService } from '@services/youtubeService.service';

@Component({
  selector: 'app-search-input',
  templateUrl: './search-input.component.html',
  styleUrls: ['./search-input.component.scss'],
})

export class SearchInputComponent implements OnInit {
  MIN_SEARCH_LENGTH = 3;
  @Output() showFilters: EventEmitter<boolean> = new EventEmitter<boolean>();

  constructor(private searchService: SearchService, private youtubeService: YoutubeService) {}

  search(term: string): void {
    this.youtubeService.videoSearchTextSource$.next(term);
  }

  ngOnInit(): void {
    this.youtubeService.videoSearchTextSource$.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      filter((text) => text.length >= this.MIN_SEARCH_LENGTH),
    ).subscribe(() => this.searchService.requestVideos());
  }

  toggleFiltersBtn(): void {
    this.showFilters.emit(true);
  }
}
