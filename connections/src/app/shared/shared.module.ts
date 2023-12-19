import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControlComponent } from './components/form-control/form-control.component';
import { ReactiveFormsModule } from '@angular/forms';
import { DialogComponent } from './components/dialog/dialog.component';
import { MatDialogModule } from '@angular/material/dialog';
import { SortByDate } from './pipes/sortByDate.pipe';

@NgModule({
  declarations: [FormControlComponent, DialogComponent, SortByDate],
  exports: [FormControlComponent, DialogComponent, SortByDate],
  imports: [ReactiveFormsModule, CommonModule, MatDialogModule],
})
export class SharedModule {}
