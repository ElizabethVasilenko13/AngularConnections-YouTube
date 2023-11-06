import { Component, Input } from '@angular/core';
import { Location } from '@angular/common';
import { IYouTubeApiItem } from 'src/app/shared/models/search-item.model';

@Component({
  selector: 'app-detail-video-item',
  templateUrl: './detail-video-item.component.html',
  styleUrls: ['./detail-video-item.component.scss']
})
export class DetailVideoItemComponent {
  @Input() video!: IYouTubeApiItem;

  constructor(private location: Location) {}

  goBack(): void {
    this.location.back();
  }
}
