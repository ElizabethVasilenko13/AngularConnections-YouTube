import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserPageComponent } from './pages/user-page/user-page.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    UserPageComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],
  exports: [UserPageComponent]
})
export class UserModule { }
