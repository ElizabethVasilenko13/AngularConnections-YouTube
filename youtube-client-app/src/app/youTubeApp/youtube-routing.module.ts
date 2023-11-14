import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
// import { MainComponent } from './pages/main/main.component';
import { DetailInfoPageComponent } from './pages/detail-info-page/detail-info-page.component';
import { SearchResultComponent } from './pages/search-result-page/search-result.component';

const routes: Routes = [
  { path: 'main', component: SearchResultComponent },
  { path: 'detail/:id', component: DetailInfoPageComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class YoutubeRoutingModule {}
