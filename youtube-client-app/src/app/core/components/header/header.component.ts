import { Component } from '@angular/core';
import { AuthService } from 'src/app/auth/services/auth.service';
import { DataSharingService } from 'src/app/core/services/dataSharingService.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})

export class HeaderComponent {
  searchButtonName = 'Searh';
  searchButtonClassName = 'search__button';
  roundedImgBtn = 'img__btn';
  logoutButtonName = 'Logout';
  logoutButtonClassName = 'item__button';

  isSortingBlockVisible = false;

  constructor(private dataSharingService: DataSharingService, private auth: AuthService) {}

  toggleShowSortBtn() {
    this.isSortingBlockVisible = !this.isSortingBlockVisible;
  }

  logout() {
    this.auth.logout();
  }

  handleSearchBtn() {
    this.dataSharingService.showSearchResult();
  }
}
