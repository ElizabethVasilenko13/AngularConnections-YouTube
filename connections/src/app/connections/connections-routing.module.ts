import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { MAIN_PAGE_ROUTE } from '@core/constants/routing';

const routes: Routes = [
  {path: MAIN_PAGE_ROUTE, component: HomeComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ConnectionsRoutingModule { }
