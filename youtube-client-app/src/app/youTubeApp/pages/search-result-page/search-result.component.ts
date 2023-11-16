import { Component } from '@angular/core';
import { SearchService } from 'src/app/services/searchService.service';


@Component({
  selector: 'app-search-result',
  templateUrl: './search-result.component.html',
  styleUrls: ['./search-result.component.scss'],
})
export class SearchResultComponent  {
  constructor(public searchService: SearchService) {}
}
