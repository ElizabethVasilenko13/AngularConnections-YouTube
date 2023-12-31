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
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '@shared/shared.module';
import { RouterModule } from '@angular/router';
import { GroupPageComponent } from './pages/group-page/group-page.component';
import { UsersEffects } from './store/users/users.effects';
import { usersReducer } from './store/users/users.reducers';
import { ConversationPageComponent } from './pages/conversation-page/conversation-page.component';
import { UsersApiService } from './services/users-api.service';
import { MaterialModule } from '@material/material.module';
import { GroupsApiService } from './services/groups-api.service';
import { UserNameTransformPipe } from './pipes/user-name-transform.pipe';

@NgModule({
  declarations: [
    MainPageComponent,
    PeopleComponent,
    GroupsComponent,
    GroupPageComponent,
    ConversationPageComponent,
    UserNameTransformPipe
    ],
  exports: [MainPageComponent],
  imports: [
    MaterialModule,
    ReactiveFormsModule,
    SharedModule,
    RouterModule,
    StoreModule.forFeature(Features.Groups, groupsReducer),
    StoreModule.forFeature(Features.Users, usersReducer),
    EffectsModule.forFeature([GroupsEffects, UsersEffects]),
    CommonModule
  ],
  providers: [UsersApiService, GroupsApiService]
})
export class PeopleGroupsModule { }
