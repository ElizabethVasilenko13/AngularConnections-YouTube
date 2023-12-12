import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthRoutingModule } from './auth-routing.module';
import { RegistrationPageComponent } from './pages/registration-page/registration-page.component';
import { LoginPageComponent } from './pages/login-page/login-page.component';
import { ReactiveFormsModule } from '@angular/forms';
import { FormControlComponent } from './components/form-control/form-control.component';
import { MatButtonModule } from '@angular/material/button';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { Features } from '@store/features.enum';
import { authReducer } from './store/auth.reduces';
import { SignUpService } from './services/sign-up.service';
import { AuthEffects } from './store/auth.effects';
import { MatSnackBarModule } from '@angular/material/snack-bar';



@NgModule({
  declarations: [
    RegistrationPageComponent,
    LoginPageComponent,
    FormControlComponent
  ],
  imports: [
    CommonModule,
    MatButtonModule,
    AuthRoutingModule,
    ReactiveFormsModule,
    MatSnackBarModule,
    StoreModule.forFeature(Features.Auth, authReducer),
    EffectsModule.forFeature([AuthEffects]),
  ],
  providers: [SignUpService]
})
export class AuthModule { }
