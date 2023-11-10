import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { SearchService } from 'src/app/core/services/searchService.service';
import { IYouTubeApiItem } from 'src/app/shared/models/search-item.model';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
})
export class MainComponent implements OnInit, OnDestroy {
  videos: IYouTubeApiItem[] = [];
  isSortingVisible = false;
  private subscriptions: Subscription[] = [];

  constructor(private searchService: SearchService) {}

  ngOnInit(): void {
    this.subscriptions.push(
      this.searchService.videosSource.subscribe((videos) => {
        this.videos = videos;
      })
    );

    this.subscriptions.push(
      this.searchService.isSearchResultVisibleSource.subscribe((isVisible) => {
        this.isSortingVisible = isVisible;
      })
    );
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((subscription) => {
      subscription.unsubscribe();
    });
  }
}
