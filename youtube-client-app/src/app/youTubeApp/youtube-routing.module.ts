import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MainComponent } from './pages/main/main.component';
import { DetailInfoPageComponent } from './pages/detail-info-page/detail-info-page.component';

const routes: Routes = [
  { path: 'main', component: MainComponent },
  { path: 'detail/:id', component: DetailInfoPageComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class YoutubeRoutingModule {}
