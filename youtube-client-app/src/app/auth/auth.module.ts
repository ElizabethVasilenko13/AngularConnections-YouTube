import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthRoutingModule } from './auth-routing.module';
import { LoginPageComponent } from './pages/login-page.component';
import { LoginFormComponent } from './components/login-form/login-form.component';
import { ButtonComponent } from '../shared/ui/button/button.component';

@NgModule({
  declarations: [
    LoginPageComponent,
    LoginFormComponent
  ],
  imports: [
    CommonModule,
    AuthRoutingModule,
    ButtonComponent
  ]
})
export class AuthModule {}
