import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControlComponent } from './components/form-control/form-control.component';
import { ReactiveFormsModule } from '@angular/forms';
import { DialogComponent } from './components/dialog/dialog.component';
import { MaterialModule } from '@material/material.module';
import { LoaderComponent } from './components/loader/loader.component';
import { SortBy } from './pipes/sort-by.pipe';

@NgModule({
  declarations: [
    FormControlComponent,
    DialogComponent,
    LoaderComponent,
    SortBy,
  ],
  exports: [FormControlComponent, DialogComponent, LoaderComponent, SortBy],
  imports: [ReactiveFormsModule, CommonModule, MaterialModule],
})
export class SharedModule {}
