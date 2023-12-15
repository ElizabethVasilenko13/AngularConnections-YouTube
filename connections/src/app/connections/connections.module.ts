import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConnectionsRoutingModule } from './connections-routing.module';
import { HomeComponent } from './pages/home/home.component';
import { CoreComponent } from './components/core/core.component';
import { MatIconModule } from '@angular/material/icon';
import { UserModule } from './modules/user/user.module';
import { SharedModule } from '@shared/shared.module';

@NgModule({
  declarations: [HomeComponent, CoreComponent],
  imports: [
    CommonModule,
    ConnectionsRoutingModule,
    MatIconModule,
    UserModule,
    SharedModule,
  ],
})
export class ConnectionsModule {}
