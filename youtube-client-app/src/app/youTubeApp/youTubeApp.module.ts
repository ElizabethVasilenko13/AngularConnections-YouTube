import { NO_ERRORS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SortingComponent } from './components/sorting/sorting.component';
import { MainComponent } from './pages/main/main.component';
import { SharedModule } from '../shared/shared.module';
import { SearchResultComponent } from './components/search-result/search-result.component';
import { SearchItemComponent } from './components/search-item/search-item.component';
import { SortingStateService } from './services/sortingState.service';
import { YoutubeRoutingModule } from './youtube-routing.module';
import { DetailInfoPageComponent } from './pages/detail-info-page/detail-info-page.component';
import { VideoStaticsComponent } from './components/video-statics/video-statics.component';
import { ButtonComponent } from '../shared/ui/button/button.component';

@NgModule({
  declarations: [
    SortingComponent,
    MainComponent,
    SearchResultComponent,
    SearchItemComponent,
    DetailInfoPageComponent,
    VideoStaticsComponent
  ],
  exports: [SortingComponent, MainComponent],
  imports: [
    CommonModule,
    SharedModule,
    FormsModule,
    YoutubeRoutingModule,
    ButtonComponent
  ],
  providers: [SortingStateService],
  schemas: [NO_ERRORS_SCHEMA]
})
export class YouTubeAppModule { }
