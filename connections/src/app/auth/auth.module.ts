import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthRoutingModule } from './auth-routing.module';
import { RegistrationPageComponent } from './pages/registration-page/registration-page.component';
import { LoginPageComponent } from './pages/login-page/login-page.component';
import { ReactiveFormsModule } from '@angular/forms';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { Features } from '@shared/enums/store-feautures.enum';
import { authReducer } from './store/signup/signup.reduces';
import { AuthApiService } from './services/auth-api.service';
import { AuthEffects } from './store/signup/signup.effects';
import { signinReducer } from './store/signin/signin.reducer';
import { SignInEffects } from './store/signin/signin.effects';
import { SharedModule } from '@shared/shared.module';
import { SignUpService } from './services/sign-up.service';
import { SignInService } from './services/sign-in.service';
import { MaterialModule } from '@material/material.module';

@NgModule({
  declarations: [RegistrationPageComponent, LoginPageComponent],
  imports: [
    CommonModule,
    AuthRoutingModule,
    ReactiveFormsModule,
    SharedModule,
    MaterialModule,
    StoreModule.forFeature(Features.SignUp, authReducer),
    StoreModule.forFeature(Features.SignIn, signinReducer),
    EffectsModule.forFeature([AuthEffects, SignInEffects]),
  ],
  providers: [AuthApiService, SignUpService, SignInService],
})
export class AuthModule {}
