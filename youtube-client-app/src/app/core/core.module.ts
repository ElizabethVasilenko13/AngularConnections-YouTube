import { NO_ERRORS_SCHEMA, NgModule, isDevMode } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { SharedModule } from '@shared/shared.module';
import { YouTubeAppModule } from '@youtube/youTubeApp.module';
import { HeaderComponent } from './components/header/header.component';
import { SearchInputComponent } from './components/header/search-input/search-input.component';
import { SortingService } from './services/sorting.service';
import { FiltersComponent } from './components/header/filters/filters.component';
import { CoreComponent } from './components/core/core.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { LoggerService } from './services/logger.service';
import { LoggerDevService } from './services/logger-dev.service';
import { LoggerProdService } from './services/logger-prod.service';
import { YouTubeApiService } from './interceprors/you-tube-api.service';
import { UserBarComponent } from './components/header/user-bar/user-bar.component';

@NgModule({
  declarations: [HeaderComponent, FiltersComponent, SearchInputComponent, CoreComponent, NotFoundComponent, UserBarComponent],
  exports: [CoreComponent, NotFoundComponent],
  imports: [CommonModule, SharedModule, YouTubeAppModule, FormsModule, RouterModule],
  providers: [
    SortingService,
    {
      provide: LoggerService,
      useClass: isDevMode() ? LoggerDevService : LoggerProdService,
    },
    { provide: HTTP_INTERCEPTORS, useClass: YouTubeApiService, multi: true },
  ],
  schemas: [NO_ERRORS_SCHEMA],
})
export class CoreModule {}
