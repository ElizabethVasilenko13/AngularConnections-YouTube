import { NO_ERRORS_SCHEMA, NgModule, isDevMode } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { HeaderComponent } from './components/header/header.component';
import { SharedModule } from '../shared/shared.module';
import { YouTubeAppModule } from '../youTubeApp/youTubeApp.module';
import { ButtonComponent } from '../shared/ui/button/button.component';
import { SearchInputComponent } from './components/header/search-input/search-input.component';
import { SortingService } from './services/sorting.service';
import { FiltersComponent } from './components/header/filters/filters.component';
import { CoreComponent } from './components/core/core.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { LoggerService } from './services/logger.service';
import { LoggerDevService } from './services/logger-dev.service';
import { LoggerProdService } from './services/logger-prod.service';

@NgModule({
  declarations: [HeaderComponent, FiltersComponent, SearchInputComponent, CoreComponent, NotFoundComponent],
  exports: [CoreComponent, NotFoundComponent],
  imports: [
    CommonModule,
    SharedModule,
    YouTubeAppModule,
    ButtonComponent,
    FormsModule,
    RouterModule
  ],
  providers: [
    SortingService,
    {
      provide: LoggerService,
      useClass: isDevMode() ? LoggerDevService : LoggerProdService,
    }
  ],
  schemas: [NO_ERRORS_SCHEMA],
})
export class CoreModule {}
