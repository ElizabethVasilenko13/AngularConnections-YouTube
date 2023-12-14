import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ConnectionsRoutingModule } from './connections-routing.module';
import { HomeComponent } from './pages/home/home.component';


@NgModule({
  declarations: [
    HomeComponent
  ],
  imports: [
    CommonModule,
    ConnectionsRoutingModule
  ]
})
export class ConnectionsModule { }
