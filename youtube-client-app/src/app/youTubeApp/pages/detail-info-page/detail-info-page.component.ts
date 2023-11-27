import { Component, OnDestroy, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { Store } from '@ngrx/store';
import { ActivatedRoute } from '@angular/router';
import { YoutubeService } from '@services/youtubeService.service';
import { FavoriteService } from '@services/favorite-service.service';
import { Observable, Subscription } from 'rxjs';
import { IYouTubeCustomItem, IYouTubeItem } from '@shared/models/search-item.model';
import { selectVideoByIndex } from '@redux/selectors/videos.selector';


@Component({
  selector: 'app-detail-info-page',
  templateUrl: './detail-info-page.component.html',
  styleUrls: ['./detail-info-page.component.scss'],
})

export class DetailInfoPageComponent implements OnInit {
  video: IYouTubeItem | null = null;
  customVideo$!: Observable<IYouTubeCustomItem>;
  customVideo: IYouTubeCustomItem | null = null;
  videoId = '';

  constructor(
    private route: ActivatedRoute,
    private youtubeService: YoutubeService,
    private location: Location,
    private store: Store,
    readonly favoriteService: FavoriteService
  ) {}

  ngOnInit(): void {
    this.getVideo();
  }

  getVideo(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
    this.videoId = this.route.snapshot.paramMap.get('id') as string;
    if (this.videoId) {
      this.youtubeService.getVideoInfo(this.videoId).subscribe({
        next: (video) => {
          if (video && Object.keys(video).length > 0) {
            this.video = video;
          }
          this.customVideo$ = this.store.select(selectVideoByIndex(+this.videoId));
          this.customVideo$.subscribe((customvideo) => {
            if (customvideo && Object.keys(customvideo).length > 0) {
              this.customVideo = customvideo;
            }
          });
        },
      });
    }
  }
}

  goBack(): void {
    this.location.back();
  }

  // ngOnDestroy(): void {
  //   this.getVideoInfoSubscription.unsubscribe();
  // }
}
