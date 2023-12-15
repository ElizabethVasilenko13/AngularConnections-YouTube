import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';

import { UserPageComponent } from './pages/user-page/user-page.component';
import { ReactiveFormsModule } from '@angular/forms';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { Features } from '@store/features.enum';
import { userReducer } from './store/user.reducers';
import { UserEffects } from './store/user.effects';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { SharedModule } from '@shared/shared.module';

@NgModule({
  declarations: [UserPageComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatProgressSpinnerModule,
    SharedModule,
    StoreModule.forFeature(Features.User, userReducer),
    EffectsModule.forFeature([UserEffects]),
  ],
  providers: [DatePipe],
  exports: [UserPageComponent],
})
export class UserModule {}
