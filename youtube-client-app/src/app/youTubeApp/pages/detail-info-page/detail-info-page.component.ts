import { Component, OnDestroy, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { IYouTubeApiItem } from '@shared/models/search-item.model';
import { YoutubeService } from '@services/youtubeService.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-detail-info-page',
  templateUrl: './detail-info-page.component.html',
  styleUrls: ['./detail-info-page.component.scss'],
})
export class DetailInfoPageComponent implements OnInit, OnDestroy {
  video: IYouTubeApiItem | null = null
  private getVideoInfoSubscription: Subscription = new Subscription();
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
