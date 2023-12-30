import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainPageComponent } from './pages/main/main.component';
import { GroupsComponent } from './componennts/groups/groups.component';
import { PeopleComponent } from './componennts/people/people.component';
import { StoreModule } from '@ngrx/store';
import { Features } from "@shared/enums/store-feautures.enum";
import { EffectsModule } from '@ngrx/effects';
import { groupsReducer } from './store/groups/groups.reducers';
import { GroupsEffects } from './store/groups/groups.effects';
import { GroupsItemComponent } from './componennts/groups/groups-item/groups-item.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '@shared/shared.module';
import { RouterModule } from '@angular/router';
import { GroupPageComponent } from './pages/group-page/group-page.component';
import { UsersEffects } from './store/users/users.effects';
import { usersReducer } from './store/users/users.reducers';
import { ConversationPageComponent } from './pages/conversation-page/conversation-page.component';
import { MatIconModule } from '@angular/material/icon';
import { UsersService } from './services/users.service';
import { GroupsService } from './services/groups.service';


@NgModule({
  declarations: [
    MainPageComponent,
    PeopleComponent,
    GroupsItemComponent,
    GroupsComponent,
    GroupPageComponent,
    ConversationPageComponent
  ],
  exports: [MainPageComponent],
  imports: [
    MatIconModule,
    MatProgressSpinnerModule,
    ReactiveFormsModule,
    SharedModule,
    RouterModule,
    StoreModule.forFeature(Features.Groups, groupsReducer),
    StoreModule.forFeature(Features.Users, usersReducer),
    EffectsModule.forFeature([GroupsEffects, UsersEffects]),
    CommonModule
  ],
  providers: [UsersService, GroupsService]
})
export class PeopleGroupsModule { }
