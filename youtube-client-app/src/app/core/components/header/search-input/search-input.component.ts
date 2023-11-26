
import { Component, EventEmitter, Output, OnDestroy } from '@angular/core';
import { debounceTime, distinctUntilChanged, filter } from 'rxjs/operators';
import { Subscription, of } from 'rxjs';
import { Router } from '@angular/router';
import { MAIN_PAGE_ROUTE } from '@core/consts';
import { loadVideos } from '@redux/actions/youtube-api.actions';
import { YoutubeService } from '@services/youtubeService.service';
import { AuthService } from '@services/auth.service';
import { Store } from '@ngrx/store';


@Component({
  selector: 'app-search-input',
  templateUrl: './search-input.component.html',
  styleUrls: ['./search-input.component.scss'],
})

export class SearchInputComponent implements OnDestroy {
  MIN_SEARCH_LENGTH = 3;
  @Output() showFilters: EventEmitter<boolean> = new EventEmitter<boolean>();
  private searchSubscription: Subscription = new Subscription();

  constructor(
    private youtubeService: YoutubeService,
    private router: Router,
    private authService: AuthService,
    private store: Store,
  ) {}

  search(term: string): void {
    this.searchSubscription = of(term).pipe(
      debounceTime(300),
      distinctUntilChanged(),
      filter((text: string) => text.length >= this.MIN_SEARCH_LENGTH)
    ).subscribe(() => this.store.dispatch(loadVideos({ pageToken: undefined })))
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
