import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { Store } from '@ngrx/store';
import { ActivatedRoute } from '@angular/router';
import { YoutubeService } from '@services/youtubeService.service';
import { FavoriteService } from '@services/favorite-service.service';
import { Observable, take } from 'rxjs';
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
    public youtubeService: YoutubeService,
    private location: Location,
    private store: Store,
    readonly favoriteService: FavoriteService,
  ) {}

  ngOnInit(): void {
    this.getVideo();
  }

  getVideo(): void {
    this.videoId = this.route.snapshot.paramMap.get('id') as string;
    this.customVideo$ = this.store.select(selectVideoByIndex(+this.videoId));

    if (this.videoId) {
      this.youtubeService
        .getVideoInfo(this.videoId)
        .pipe(take(1))
        .subscribe((video) => {
          if (video && Object.keys(video).length > 0) {
            this.video = video;
          }
        });

      this.customVideo$.pipe(take(1)).subscribe((customvideo) => {
        if (customvideo && Object.keys(customvideo).length > 0) {
          this.customVideo = customvideo;
        }
      });
    }
  }

  goBack(): void {
    this.location.back();
  }
}
