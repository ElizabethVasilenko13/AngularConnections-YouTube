import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { AdminRoutingModule } from './admin-routing.module';
import { AdminPageComponent } from './pages/admin-page/admin-page.component';
import { CreateCardFormComponent } from './componets/create-video-form/create-video-form.component';
import { ButtonComponent } from '../shared/ui/button/button.component';



@NgModule({
  declarations: [
    AdminPageComponent,
    CreateCardFormComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    ReactiveFormsModule,
    ButtonComponent
  ]
})
export class AdminModule { }
