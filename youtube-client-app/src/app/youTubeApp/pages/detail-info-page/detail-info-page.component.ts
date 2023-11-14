import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MockDataService } from 'src/app/services/mockDataService.service';
import { IYouTubeApiItem } from 'src/app/shared/models/search-item.model';

@Component({
  selector: 'app-detail-info-page',
  templateUrl: './detail-info-page.component.html',
  styleUrls: ['./detail-info-page.component.scss']
})
export class DetailInfoPageComponent implements OnInit {
  video!: IYouTubeApiItem;

  constructor(
    private route: ActivatedRoute,
    private mockDataService: MockDataService,
  ) {}

  ngOnInit(): void {
    this.getVideo();
  }

  getVideo(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.video = this.mockDataService.getVideoInfo(id);
    }
  }
}
