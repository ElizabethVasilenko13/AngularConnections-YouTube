import { NO_ERRORS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SharedModule } from '@shared/shared.module';
import { SearchResultComponent } from './pages/search-result-page/search-result.component';
import { SearchItemComponent } from './components/search-item/search-item.component';
import { VideoStaticsComponent } from './components/video-statics/video-statics.component';
import { DetailInfoPageComponent } from './pages/detail-info-page/detail-info-page.component';
import { YoutubeRoutingModule } from './youtube-routing.module';

@NgModule({
  declarations: [SearchResultComponent, SearchItemComponent, VideoStaticsComponent, DetailInfoPageComponent],
  exports: [SearchResultComponent],
  imports: [CommonModule, SharedModule, FormsModule, YoutubeRoutingModule],
  providers: [],
  schemas: [NO_ERRORS_SCHEMA],
})
export class YouTubeAppModule {}
