import { NO_ERRORS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SortingComponent } from './components/sorting/sorting.component';
import { MainComponent } from './components/main/main.component';
import { SharedModule } from '../shared/shared.module';
import { SearchResultComponent } from './components/search-result/search-result.component';
import { SearchItemComponent } from './components/search-item/search-item.component';

@NgModule({
  declarations: [SortingComponent, MainComponent, SearchResultComponent, SearchItemComponent],
  exports: [SortingComponent, MainComponent],
  imports: [
    CommonModule,
    SharedModule
  ],
  schemas: [NO_ERRORS_SCHEMA]
})
export class YouTubeAppModule { }
