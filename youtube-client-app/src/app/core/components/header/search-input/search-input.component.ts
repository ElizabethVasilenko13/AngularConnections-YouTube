
import { Component, EventEmitter, Output, OnDestroy } from '@angular/core';
import { SearchService } from '@services/searchService.service';
import { debounceTime, distinctUntilChanged, filter } from 'rxjs/operators';
import { Subscription, of } from 'rxjs';
import { MAIN_PAGE_ROUTE } from '@core/consts';
import { Router } from '@angular/router';

@Component({
  selector: 'app-search-input',
  templateUrl: './search-input.component.html',
  styleUrls: ['./search-input.component.scss'],
})

export class SearchInputComponent implements OnDestroy {
  MIN_SEARCH_LENGTH = 3;
  @Output() showFilters: EventEmitter<boolean> = new EventEmitter<boolean>();
  private searchSubscription: Subscription = new Subscription();

  constructor(private searchService: SearchService,  private router: Router) {}

  search(term: string): void {
    this.searchSubscription = of(term).pipe(
      debounceTime(300),
      distinctUntilChanged(),
      filter((text: string) => text.length >= this.MIN_SEARCH_LENGTH)
    ).subscribe(() => this.searchService.requestVideos(term))
  }

  ngOnDestroy(): void {
    this.searchSubscription.unsubscribe();
  }

  navigateToMain(): void {
    this.router.navigate([MAIN_PAGE_ROUTE]);
  }

  toggleFiltersBtn(): void {
    this.showFilters.emit(true);
  }
}
