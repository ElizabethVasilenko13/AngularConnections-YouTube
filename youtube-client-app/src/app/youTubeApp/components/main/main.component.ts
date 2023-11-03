import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { IYouTubeApiItem } from 'src/app/shared/models/search-item.model';
import { DataSharingService } from 'src/app/shared/services/dataSharingService.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit, OnDestroy {
  videos: IYouTubeApiItem[] = [];
  isSortingVisible = false;
  private videosSubscription!: Subscription;
  private isSortingVisibleSubscription!: Subscription;

  constructor(private dataSharingService: DataSharingService) {}

  ngOnInit(): void {
    this.videosSubscription = this.dataSharingService.videosSource.subscribe((videos) => {
      this.videos = videos;
    });

    this.isSortingVisibleSubscription = this.dataSharingService
      .isSearchResultVisibleSource.subscribe((isVisible) => {
        this.isSortingVisible = isVisible;
      });
  }

  ngOnDestroy(): void {
    if (this.videosSubscription) {
      this.videosSubscription.unsubscribe();
    }
    if (this.isSortingVisibleSubscription) {
      this.isSortingVisibleSubscription.unsubscribe();
    }
  }
}
