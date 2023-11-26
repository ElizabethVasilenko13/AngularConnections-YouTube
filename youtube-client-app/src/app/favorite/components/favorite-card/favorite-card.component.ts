import { Component, Input } from '@angular/core';
import { IYouTubeItem } from '@shared/models/search-item.model';

@Component({
  selector: 'app-favorite-card',
  templateUrl: './favorite-card.component.html',
  styleUrl: './favorite-card.component.scss'
})
export class FavoriteCardComponent {
  @Input() video!: IYouTubeItem;
}
