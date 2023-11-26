import { Component, Input } from '@angular/core';
import { YoutubeService } from '@services/youtubeService.service';
import { IYouTubeCustomItem } from '@shared/models/search-item.model';

@Component({
  selector: 'app-custom-card-item',
  templateUrl: './custom-card-item.component.html',
  styleUrl: './custom-card-item.component.scss',
})
export class CustomCardItemComponent {
  @Input() video!: IYouTubeCustomItem;
  @Input() index!: number;

  constructor(public youtubeService: YoutubeService) {}
}
