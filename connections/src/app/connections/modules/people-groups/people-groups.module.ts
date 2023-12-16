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



@NgModule({
  declarations: [
    MainPageComponent,
    PeopleComponent,
    GroupsItemComponent,
    GroupsComponent
  ],
  exports: [MainPageComponent],
  imports: [
    MatProgressSpinnerModule,
    StoreModule.forFeature(Features.Groups, groupsReducer),
    EffectsModule.forFeature([GroupsEffects]),
    CommonModule
  ]
})
export class PeopleGroupsModule { }
