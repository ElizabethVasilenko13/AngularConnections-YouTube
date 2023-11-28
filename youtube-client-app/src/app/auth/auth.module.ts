import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '@shared/shared.module';
import { AuthRoutingModule } from './auth-routing.module';
import { LoginPageComponent } from './pages/login-page.component';

@NgModule({
  declarations: [LoginPageComponent],
  imports: [CommonModule, AuthRoutingModule, SharedModule],
  providers: [],
})
export class AuthModule {}
