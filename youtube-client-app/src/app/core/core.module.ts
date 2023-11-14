import { NO_ERRORS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';
import { ButtonComponent } from '../shared/ui/button/button.component';
import { SearchInputComponent } from './components/header/search-input/search-input.component';
import { CoreComponent } from './components/core/core.component';
import { YouTubeAppModule } from '../youTubeApp/youTubeApp.module';
import { SortingService } from './services/sorting.service';
import { HeaderComponent } from './components/header/header.component';
import { FiltersComponent } from './components/header/filters/filters.component';

@NgModule({
  declarations: [HeaderComponent, SearchInputComponent, CoreComponent, FiltersComponent],
  exports: [CoreComponent],
  imports: [
    CommonModule,
    SharedModule,
    YouTubeAppModule,
    ButtonComponent,
    FormsModule
  ],
  providers: [SortingService],
  schemas: [NO_ERRORS_SCHEMA]
})
export class CoreModule { }
