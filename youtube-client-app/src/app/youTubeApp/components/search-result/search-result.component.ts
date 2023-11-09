import { Component, Input, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { IYouTubeApiItem } from 'src/app/shared/models/search-item.model';
import { DataSharingService } from 'src/app/shared/services/dataSharingService.service';

@Component({
  selector: 'app-search-result',
  templateUrl: './search-result.component.html',
  styleUrls: ['./search-result.component.scss'],
})
export class SearchResultComponent implements OnDestroy {
  @Input() videos: IYouTubeApiItem[] = [];
  searchText = '';
  private subscriptions: Subscription[] = [];

  constructor(private dataSharingService: DataSharingService) {
    this.subscriptions.push(this.dataSharingService.searchTextSource.subscribe((searchText) => {
      this.searchText = searchText;
    }))
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((subscription) => {
      subscription.unsubscribe();
    })
  }
}
