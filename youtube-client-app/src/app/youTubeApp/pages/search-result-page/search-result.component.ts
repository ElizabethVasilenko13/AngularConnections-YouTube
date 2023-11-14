import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { SearchService } from 'src/app/services/searchService.service';
import { IYouTubeApiItem } from 'src/app/shared/models/search-item.model';


@Component({
  selector: 'app-search-result',
  templateUrl: './search-result.component.html',
  styleUrls: ['./search-result.component.scss'],
})
export class SearchResultComponent implements OnInit, OnDestroy {
  @Input() videos: IYouTubeApiItem[] = [];
  private subscriptions: Subscription[] = [];
  searchText = '';

  constructor(public searchService: SearchService) {}

  ngOnInit(): void {
    this.subscriptions.push(this.searchService.searchTextSource$.subscribe((searchText) => {
      this.searchText = searchText;
    }));
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((subscription) => {
      subscription.unsubscribe();
    })
  }

  sortResults(comparator: (a: IYouTubeApiItem, b: IYouTubeApiItem) => number): void {
    this.videos.sort(comparator);
  }
}
