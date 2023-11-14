import { Component, ViewChild } from '@angular/core';
import { SearchService } from 'src/app/services/searchService.service';
import { SearchResultComponent } from 'src/app/youTubeApp/pages/search-result-page/search-result.component';
import { SortComparator } from '../../models/sorting.model';

@Component({
  selector: 'app-core',
  templateUrl: './core.component.html',
  styleUrls: ['./core.component.scss']
})
export class CoreComponent {
  constructor(public searchService: SearchService) {}
  @ViewChild(SearchResultComponent) resultComponent: SearchResultComponent | undefined;

  onFilterPanel(event: SortComparator):void {
    if (this.resultComponent) {
      this.resultComponent.sortResults(event);
    }
  }
}
