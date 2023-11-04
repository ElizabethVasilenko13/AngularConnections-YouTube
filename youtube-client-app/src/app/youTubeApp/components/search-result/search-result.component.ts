import {
  Component, Input, OnDestroy, OnInit
} from '@angular/core';
import { Subscription } from 'rxjs';
import { IYouTubeApiItem } from 'src/app/shared/models/search-item.model';
import { DataSharingService } from 'src/app/shared/services/dataSharingService.service';

@Component({
  selector: 'app-search-result',
  templateUrl: './search-result.component.html',
  styleUrls: ['./search-result.component.scss']
})
export class SearchResultComponent implements OnInit, OnDestroy {
  @Input() videos: IYouTubeApiItem[] = [];
  searchText = '';
  private subscription: Subscription | null = null;

  constructor(private dataSharingService: DataSharingService) {}

  ngOnInit(): void {
    this.subscription = this.dataSharingService.searchTextSource.subscribe((searchText) => {
      this.searchText = searchText;
    });
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
