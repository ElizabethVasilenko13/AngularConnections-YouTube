import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DETAIL_PAGE_ROUTE, MAIN_PAGE_ROUTE } from '@core/consts';
import { DetailInfoPageComponent } from './pages/detail-info-page/detail-info-page.component';
import { SearchResultComponent } from './pages/search-result-page/search-result.component';

const routes: Routes = [
  { path: MAIN_PAGE_ROUTE, component: SearchResultComponent },
  { path: DETAIL_PAGE_ROUTE, component: DetailInfoPageComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class YoutubeRoutingModule {}
