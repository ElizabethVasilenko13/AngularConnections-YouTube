import { Component, Input, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { SearchService } from 'src/app/services/searchService.service';
import { IYouTubeApiItem } from 'src/app/shared/models/search-item.model';

@Component({
  selector: 'app-search-result',
  templateUrl: './search-result.component.html',
  styleUrls: ['./search-result.component.scss'],
})
export class SearchResultComponent implements OnDestroy {
  @Input() videos: IYouTubeApiItem[] = [];
  searchText = '';
  private subscriptions: Subscription[] = [];

  constructor(private searchService: SearchService) {
    this.subscriptions.push(this.searchService.searchTextSource.subscribe((searchText) => {
      this.searchText = searchText;
    }))
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((subscription) => {
      subscription.unsubscribe();
    })
  }
}
