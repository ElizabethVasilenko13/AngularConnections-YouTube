import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { Store } from '@ngrx/store';
import { Router } from '@angular/router';
import { debounceTime, distinctUntilChanged, filter } from 'rxjs/operators';
import { AuthService } from '@services/auth.service';
import { YoutubeService } from '@services/youtubeService.service';
import { loadVideos } from 'src/app/redux/actions/youtube-api.actions';
import { MAIN_PAGE_ROUTE, MIN_SEARCH_LENGTH } from 'src/app/core/consts';
import { Subscription, of } from 'rxjs';


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
