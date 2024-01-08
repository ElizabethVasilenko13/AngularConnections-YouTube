import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainPageComponent } from './pages/main/main.component';
import { GroupsComponent } from './componennts/groups/groups.component';
import { StoreModule } from '@ngrx/store';
import { Features } from '@shared/enums/store-feautures.enum';
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
import { GroupPageService } from './services/group-page.service';
import { GroupsService } from './services/groups.service';
import { UsersService } from './services/users.service';
import { ConversationPageService } from './services/conversation-page.service';
import { UsersComponent } from './componennts/users/users.component';
import { MessagesListComponent } from './componennts/messages-list/messages-list.component';
import { PostMessageFormComponent } from './componennts/post-message-input/post-message-form.component';
import { MessagesService } from './services/messages.service';
import { GroupItemComponent } from './componennts/groups/group-item/group-item.component';
import { UserItemComponent } from './componennts/users/user-item/user-item.component';

@NgModule({
  declarations: [
    MainPageComponent,
    UsersComponent,
    GroupsComponent,
    GroupPageComponent,
    ConversationPageComponent,
    UserNameTransformPipe,
    MessagesListComponent,
    PostMessageFormComponent,
    GroupItemComponent,
    UserItemComponent
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
  providers: [
    UsersApiService,
    GroupsApiService,
    GroupPageService,
    GroupsService,
    UsersService,
    ConversationPageService,
    MessagesService,
  ],
})
export class PeopleGroupsModule {}
