import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConnectionsRoutingModule } from './connections-routing.module';
import { CoreComponent } from './components/core/core.component';
import { UserModule } from './modules/user/user.module';
import { SharedModule } from '@shared/shared.module';
import { PeopleGroupsModule } from './modules/people-groups/people-groups.module';
import { MaterialModule } from '@material/material.module';

@NgModule({
  declarations: [CoreComponent],
  imports: [
    CommonModule,
    ConnectionsRoutingModule,
    PeopleGroupsModule,
    UserModule,
    SharedModule,
    MaterialModule,
  ],
})
export class ConnectionsModule {}
