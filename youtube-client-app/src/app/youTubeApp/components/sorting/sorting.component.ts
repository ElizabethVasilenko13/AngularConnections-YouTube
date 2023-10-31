import { Component } from '@angular/core';
import { DataSharingService } from 'src/app/shared/services/dataSharingService.service';

@Component({
  selector: 'app-sorting',
  templateUrl: './sorting.component.html',
  styleUrls: ['./sorting.component.scss']
})
export class SortingComponent {
  searchText = '';
  constructor(private dataSharingService: DataSharingService) {}

  updateSearchText() {
    this.dataSharingService.setSearchText(this.searchText);
  }
}
