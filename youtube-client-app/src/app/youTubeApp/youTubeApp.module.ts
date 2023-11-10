import { NO_ERRORS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SortingComponent } from './components/sorting/sorting.component';
import { SharedModule } from '../shared/shared.module';
import { SearchResultComponent } from './components/search/search-result/search-result.component';
import { SearchItemComponent } from './components/search/search-item/search-item.component';
import { SortingStateService } from './services/sortingState.service';
import { ButtonComponent } from '../shared/ui/button/button.component';

@NgModule({
  declarations: [SortingComponent, SearchResultComponent, SearchItemComponent],
  exports: [SortingComponent, SearchResultComponent],
  imports: [
    CommonModule,
    SharedModule,
    FormsModule,
    ButtonComponent
  ],
  providers: [SortingStateService],
  schemas: [NO_ERRORS_SCHEMA],
})
export class YouTubeAppModule { }
