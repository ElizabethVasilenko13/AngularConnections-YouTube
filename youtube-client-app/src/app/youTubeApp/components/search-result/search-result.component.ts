import { Component, Input } from '@angular/core';
import { IYouTubeApiItem } from 'src/app/models/search-item.model';

@Component({
  selector: 'app-search-result',
  templateUrl: './search-result.component.html',
  styleUrls: ['./search-result.component.scss']
})
export class SearchResultComponent {
  @Input() videos: IYouTubeApiItem[] = [];
}
