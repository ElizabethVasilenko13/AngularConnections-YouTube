import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainPageComponent } from './pages/main/main.component';
import { GroupsComponent } from './componennts/groups/groups.component';
import { PeopleComponent } from './componennts/people/people.component';



@NgModule({
  declarations: [
    MainPageComponent,
    GroupsComponent,
    PeopleComponent
  ],
  exports: [MainPageComponent],
  imports: [
    CommonModule
  ]
})
export class PeopleGroupsModule { }
