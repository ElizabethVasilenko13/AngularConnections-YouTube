import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CONVERSAION_PAGE_ROUTE, GROUP_PAGE_ROUTE, USER_PAGE_ROUTE } from '@core/constants/routing';
import { CoreComponent } from './components/core/core.component';
import { UserPageComponent } from './modules/user/pages/user-page/user-page.component';
import { MainPageComponent } from './modules/people-groups/pages/main/main.component';
import { GroupPageComponent } from './modules/people-groups/pages/group-page/group-page.component';
import { ConversationPageComponent } from './modules/people-groups/pages/conversation-page/conversation-page.component';

const routes: Routes = [
  {
    path: '',
    component: CoreComponent,
    children: [
      { path: '', component: MainPageComponent, pathMatch: 'full' },
      { path: USER_PAGE_ROUTE, component: UserPageComponent },
      { path: GROUP_PAGE_ROUTE, component: GroupPageComponent },
      {
        path: CONVERSAION_PAGE_ROUTE,
        component: ConversationPageComponent,
        data: { created: false },
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ConnectionsRoutingModule {}
