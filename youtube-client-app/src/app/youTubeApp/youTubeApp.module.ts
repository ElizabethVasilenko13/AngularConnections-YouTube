import { NO_ERRORS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SharedModule } from '@shared/shared.module';
import { SearchResultComponent } from './pages/search-result-page/search-result.component';
import { VideoStaticsComponent } from './components/video-statics/video-statics.component';
import { DetailInfoPageComponent } from './pages/detail-info-page/detail-info-page.component';
import { YoutubeRoutingModule } from './youtube-routing.module';
import { SortBy } from './pipes/sort-by.pipe';
import { CustomCardItemComponent } from './components/custom-card-item/custom-card-item.component';
import { VideoCardItemComponent } from './components/video-card-item/video-card-item.component';
import { FavoriteButtonComponent } from './components/favorite-button/favorite-button.component';
import { PaginationComponent } from './components/pagination/pagination.component';

@NgModule({
  declarations: [
    SearchResultComponent,
    VideoStaticsComponent,
    DetailInfoPageComponent,
    CustomCardItemComponent,
    VideoCardItemComponent,
    FavoriteButtonComponent,
    PaginationComponent,
    SortBy
  ],
  imports: [
    CommonModule,
    SharedModule,
    FormsModule,
    YoutubeRoutingModule
  ],
  exports: [SearchResultComponent, VideoStaticsComponent, VideoCardItemComponent],
  providers: [],
  schemas: [NO_ERRORS_SCHEMA],
})
export class YouTubeAppModule {}
