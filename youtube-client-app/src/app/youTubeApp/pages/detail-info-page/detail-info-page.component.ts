import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { MockDataService } from '@services/mockDataService.service';
import { IYouTubeApiItem } from '@shared/models/search-item.model';

@Component({
  selector: 'app-detail-info-page',
  templateUrl: './detail-info-page.component.html',
  styleUrls: ['./detail-info-page.component.scss'],
})
export class DetailInfoPageComponent implements OnInit {
  video!: IYouTubeApiItem;

  constructor(
    private route: ActivatedRoute,
    private mockDataService: MockDataService,
    private location: Location,
  ) {}

  ngOnInit(): void {
    this.getVideo();
  }

  getVideo(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.mockDataService.getVideoInfo(id).subscribe({
        next: (video) => {
          if (video) {
            this.video = video;
          }
        },
        error: (error) => {
          console.error('Error fetching', error);
        },
      });
    }
  }

  goBack(): void {
    this.location.back();
  }
}
