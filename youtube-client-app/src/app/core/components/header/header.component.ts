import { Component } from '@angular/core';
import { DataSharingService } from 'src/app/shared/services/dataSharingService.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})

export class HeaderComponent {
  searchButtonName = 'Searh';
  searchButtonClassName = 'search__button';
  roundedImgBtn = 'img__btn';

  isSortingBlockVisible = false;

  constructor(private dataSharingService: DataSharingService) {}

  toggleShowSortBtn() {
    this.isSortingBlockVisible = !this.isSortingBlockVisible;
  }

  handleSearchBtn() {
    this.dataSharingService.showSearchResult();
  }
}
