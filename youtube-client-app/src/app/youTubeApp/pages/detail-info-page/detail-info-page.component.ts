import { Component, OnDestroy, OnInit } from '@angular/core';
import { Location } from '@angular/common';
<<<<<<< HEAD
import { ActivatedRoute } from '@angular/router';
import { IYouTubeApiItem } from '@shared/models/search-item.model';
import { YoutubeService } from '@services/youtubeService.service';
import { Subscription } from 'rxjs';
=======
import { YoutubeService } from '@services/youtubeService.service';
import { IYouTubeItem } from '@shared/models/search-item.model';
>>>>>>> 6e894d9 (feat: udpade store)

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

>>>>>>> 6e894d9 (feat: udpade store)
  constructor(
    private route: ActivatedRoute,
    private youtubeService: YoutubeService,
    private location: Location
  ) {}

  ngOnInit(): void {
    this.getVideo();
  }

  getVideo(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.getVideoInfoSubscription = this.youtubeService.getVideoInfo(id).subscribe((video) => { this.video = video });
    }
  }

  goBack(): void {
    this.location.back();
  }

  ngOnDestroy(): void {
    this.getVideoInfoSubscription.unsubscribe();
  }
}
