import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { USER_PAGE_ROUTE } from '@core/constants/routing';
import { CoreComponent } from './components/core/core.component';
import { UserPageComponent } from './modules/user/pages/user-page/user-page.component';
import { MainPageComponent } from './modules/people-groups/pages/main/main.component';

const routes: Routes = [
  {
    path: '',
    component: CoreComponent,
    children: [
      { path: '', component: MainPageComponent,  pathMatch: 'full'},
      { path: USER_PAGE_ROUTE, component: UserPageComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ConnectionsRoutingModule {}
