import { Component } from '@angular/core';
import { MockDataService } from 'src/app/shared/services/mockDataService.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  searchButtonName = 'Searh';
  searchButtonClassName = 'search__button';
  roundedImgBtn = 'img__btn';

  constructor(private mockData: MockDataService) {
    console.log(mockData);
  }
}
