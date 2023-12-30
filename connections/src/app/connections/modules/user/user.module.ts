import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';

import { UserPageComponent } from './pages/user-page/user-page.component';
import { ReactiveFormsModule } from '@angular/forms';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { Features } from "@shared/enums/store-feautures.enum";
import { userReducer } from './store/user.reducers';
import { UserEffects } from './store/user.effects';
import { SharedModule } from '@shared/shared.module';
import { UserService } from './services/user.service';
import { MaterialModule } from '@material/material.module';

@NgModule({
  declarations: [UserPageComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    SharedModule,
    MaterialModule,
    StoreModule.forFeature(Features.User, userReducer),
    EffectsModule.forFeature([UserEffects]),
  ],
  providers: [DatePipe, UserService],
  exports: [UserPageComponent],
})
export class UserModule {}
