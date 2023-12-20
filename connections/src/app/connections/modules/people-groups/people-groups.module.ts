import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainPageComponent } from './pages/main/main.component';
import { GroupsComponent } from './componennts/groups/groups.component';
import { PeopleComponent } from './componennts/people/people.component';
import { StoreModule } from '@ngrx/store';
import { Features } from '@store/features.enum';
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
import { groupDialogReducer } from './store/group-dialog/group-dialog.reducers';
import { GroupDialodEffects } from './store/group-dialog/group-dialog.effects';
import { ConversationEffects } from './store/conversation/conversation.effects';
import { conversationReducer } from './store/conversation/conversation.reducers';



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
    StoreModule.forFeature(Features.GroupDialog, groupDialogReducer),
    StoreModule.forFeature(Features.Conversation, conversationReducer),
    EffectsModule.forFeature([GroupsEffects, UsersEffects, GroupDialodEffects, ConversationEffects]),
    CommonModule
  ]
})
export class PeopleGroupsModule { }
