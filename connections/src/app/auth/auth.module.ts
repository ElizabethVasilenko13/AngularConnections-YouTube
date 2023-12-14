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
import { authReducer } from './store/signup/signup.reduces';
import { SignUpService } from './services/sign-up.service';
import { AuthEffects } from './store/signup/signup.effects';
import { signinReducer } from './store/signin/signin.reducer';
import { SignInEffects } from './store/signin/signin.effects';

@NgModule({
  declarations: [
    RegistrationPageComponent,
    LoginPageComponent,
    FormControlComponent,
  ],
  imports: [
    CommonModule,
    MatButtonModule,
    AuthRoutingModule,
    ReactiveFormsModule,
    StoreModule.forFeature(Features.SignUp, authReducer),
    StoreModule.forFeature(Features.SignIn, signinReducer),
    EffectsModule.forFeature([AuthEffects, SignInEffects]),
  ],
  providers: [SignUpService],
})
export class AuthModule {}
