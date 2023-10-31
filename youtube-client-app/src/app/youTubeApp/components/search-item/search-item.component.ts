import { Component, Input } from '@angular/core';
import { IYouTubeApiItem } from 'src/app/shared/models/search-item.model';

@Component({
  selector: 'app-search-item',
  templateUrl: './search-item.component.html',
  styleUrls: ['./search-item.component.scss']
})
export class SearchItemComponent {
  @Input() video!: IYouTubeApiItem;
  videoBtnName = 'more...';
  videoButtonClassName = 'item__button';
}
