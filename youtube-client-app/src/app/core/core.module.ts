import { NO_ERRORS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HeaderComponent } from './components/header/header.component';
import { SharedModule } from '../shared/shared.module';
import { YouTubeAppModule } from '../youTubeApp/youTubeApp.module';
import { ButtonComponent } from '../shared/ui/button/button.component';
import { SearchInputComponent } from './components/header/search-input/search-input.component';
import { SortingService } from './services/sorting.service';
import { FiltersComponent } from './components/header/filters/filters.component';

@NgModule({
  declarations: [HeaderComponent, FiltersComponent, SearchInputComponent],
  exports: [HeaderComponent],
  imports: [
    CommonModule,
    SharedModule,
    YouTubeAppModule,
    ButtonComponent,
    FormsModule
  ],
  providers: [SortingService],
  schemas: [NO_ERRORS_SCHEMA],
})
export class CoreModule { }
