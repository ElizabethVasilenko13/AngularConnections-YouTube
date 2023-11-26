import { Component, OnDestroy, OnInit } from '@angular/core';
import { Location } from '@angular/common';
<<<<<<< HEAD
import { ActivatedRoute } from '@angular/router';
import { IYouTubeApiItem } from '@shared/models/search-item.model';
import { YoutubeService } from '@services/youtubeService.service';
import { Subscription } from 'rxjs';
=======
import { YoutubeService } from '@services/youtubeService.service';
<<<<<<< HEAD
import { IYouTubeItem } from '@shared/models/search-item.model';
>>>>>>> 6e894d9 (feat: udpade store)
=======
import { IYouTubeCustomItem, IYouTubeItem } from '@shared/models/search-item.model';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { selectVideoByIndex } from 'src/app/redux/selectors/videos.selector';
<<<<<<< HEAD
>>>>>>> 348c225 (feat: implement custom card store, delete and creation)
=======
import { FavoriteService } from '@services/favorite-service.service';
>>>>>>> 943e393 (feat: implement favorites btns)

@Component({
  selector: 'app-detail-info-page',
  templateUrl: './detail-info-page.component.html',
  styleUrls: ['./detail-info-page.component.scss'],
})
<<<<<<< HEAD
export class DetailInfoPageComponent implements OnInit, OnDestroy {
  video: IYouTubeApiItem | null = null
  private getVideoInfoSubscription: Subscription = new Subscription();
=======
export class DetailInfoPageComponent implements OnInit {
  video: IYouTubeItem | null = null;
  customVideo$!: Observable<IYouTubeCustomItem>;
  customVideo: IYouTubeCustomItem | null = null;
  videoId = '';

>>>>>>> 6e894d9 (feat: udpade store)
  constructor(
    private route: ActivatedRoute,
<<<<<<< HEAD
    private youtubeService: YoutubeService,
    private location: Location
=======
    public youtubeService: YoutubeService,
    private location: Location,
<<<<<<< HEAD
    private store: Store
>>>>>>> 348c225 (feat: implement custom card store, delete and creation)
=======
    private store: Store,
<<<<<<< HEAD
    readonly favoriteService: FavoriteService
>>>>>>> 943e393 (feat: implement favorites btns)
=======
    readonly favoriteService: FavoriteService,
>>>>>>> 66dca0b (feat: update pagination)
  ) {}

  ngOnInit(): void {
    this.getVideo();
  }

  getVideo(): void {
<<<<<<< HEAD
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.getVideoInfoSubscription = this.youtubeService.getVideoInfo(id).subscribe((video) => { this.video = video });
=======
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
>>>>>>> 348c225 (feat: implement custom card store, delete and creation)
    }
  }

  goBack(): void {
    this.location.back();
  }

  ngOnDestroy(): void {
    this.getVideoInfoSubscription.unsubscribe();
  }
}
