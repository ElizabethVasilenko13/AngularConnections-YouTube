import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControlComponent } from './components/form-control/form-control.component';
import { ReactiveFormsModule } from '@angular/forms';
import { DialogComponent } from './components/dialog/dialog.component';
import { MatDialogModule } from '@angular/material/dialog';

@NgModule({
  declarations: [FormControlComponent, DialogComponent],
  exports: [FormControlComponent, DialogComponent],
  imports: [ReactiveFormsModule, CommonModule, MatDialogModule],
})
export class SharedModule {}
