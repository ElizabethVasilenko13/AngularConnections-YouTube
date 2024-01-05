import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControlComponent } from './components/form-control/form-control.component';
import { ReactiveFormsModule } from '@angular/forms';
import { DialogComponent } from './components/dialog/dialog.component';
import { MaterialModule } from '@material/material.module';
import { LoaderComponent } from './components/loader/loader.component';
import { SortBy } from './pipes/sort-by.pipe';
import { CountdownMessageComponent } from './components/countdown-message/countdown-message.component';
import { ButtonComponent } from './components/button/button.component';

@NgModule({
  declarations: [
    FormControlComponent,
    DialogComponent,
    LoaderComponent,
    SortBy,
    CountdownMessageComponent,
    ButtonComponent,
  ],
  exports: [
    FormControlComponent,
    DialogComponent,
    LoaderComponent,
    SortBy,
    CountdownMessageComponent,
    ButtonComponent,
  ],
  imports: [ReactiveFormsModule, CommonModule, MaterialModule],
})
export class SharedModule {}
