import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { Store } from '@ngrx/store';
import { Router } from '@angular/router';
import { debounceTime, distinctUntilChanged, filter } from 'rxjs/operators';
import { YoutubeService } from '@services/youtubeService.service';
import { MAIN_PAGE_ROUTE, MIN_SEARCH_LENGTH } from 'src/app/core/consts';
import { Subscription } from 'rxjs';
import { loadVideos } from '@redux/actions/videos.actions';

@Component({
  selector: 'app-search-input',
  templateUrl: './search-input.component.html',
  styleUrls: ['./search-input.component.scss'],
})
export class SearchInputComponent implements OnInit, OnDestroy {
  @Output() showFilters: EventEmitter<boolean> = new EventEmitter<boolean>();
  private searchSubscription: Subscription = new Subscription();

  constructor(
    private youtubeService: YoutubeService,
    private router: Router,
    private store: Store,
  ) {}

  ngOnInit(): void {
    this.searchSubscription = this.youtubeService.searchTerm$
      .pipe(
        debounceTime(300),
        distinctUntilChanged(),
        filter((text: string) => text.length >= MIN_SEARCH_LENGTH),
      )
      .subscribe(() => this.store.dispatch(loadVideos({ pageToken: undefined })));
  }

  search(term: string): void {
    this.youtubeService.searchTerm$.next(term);
  }

  navigateToMain(): void {
    this.router.navigate([MAIN_PAGE_ROUTE]);
  }

  toggleFiltersBtn(): void {
    this.showFilters.emit(true);
  }

  ngOnDestroy(): void {
    this.searchSubscription.unsubscribe();
  }
}
