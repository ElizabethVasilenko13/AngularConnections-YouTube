import { Component, Input } from '@angular/core';
import { FavoriteService } from '@services/favorite-service.service';
import { IYouTubeItem } from '@shared/models/search-item.model';

@Component({
  selector: 'app-search-item',
  templateUrl: './video-card-item.component.html',
  styleUrls: ['./video-card-item.component.scss'],
})
export class VideoCardItemComponent {
  @Input() video!: IYouTubeItem;
  constructor(readonly favoriteService: FavoriteService) {}
}
