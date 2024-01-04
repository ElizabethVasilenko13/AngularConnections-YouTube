import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControlComponent } from './components/form-control/form-control.component';
import { ReactiveFormsModule } from '@angular/forms';
import { DialogComponent } from './components/dialog/dialog.component';
import { SortByDate } from './pipes/sortByDate.pipe';
import { MaterialModule } from '@material/material.module';
import { LoaderComponent } from './components/loader/loader.component';

@NgModule({
  declarations: [
    FormControlComponent,
    DialogComponent,
    SortByDate,
    LoaderComponent,
  ],
  exports: [FormControlComponent, DialogComponent, SortByDate, LoaderComponent],
  imports: [ReactiveFormsModule, CommonModule, MaterialModule],
})
export class SharedModule {}
