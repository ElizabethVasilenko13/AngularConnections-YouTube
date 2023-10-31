import { Component, Input } from '@angular/core';
import { IYouTubeApiItem } from 'src/app/shared/models/search-item.model';
import { DataSharingService } from 'src/app/shared/services/dataSharingService.service';

@Component({
  selector: 'app-search-result',
  templateUrl: './search-result.component.html',
  styleUrls: ['./search-result.component.scss']
})
export class SearchResultComponent {
  @Input() videos: IYouTubeApiItem[] = [];
  searchText = '';

  constructor(private dataSharingService: DataSharingService) {
    this.dataSharingService.searchInputText$.subscribe((searchText) => {
      this.searchText = searchText;
    });
  }
}
