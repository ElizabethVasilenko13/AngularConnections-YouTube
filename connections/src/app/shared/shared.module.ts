import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControlComponent } from './components/form-control/form-control.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ModalComponent } from './components/modal/modal.component';
import { DialogComponent } from './components/dialog/dialog.component';
import { MatDialogModule } from '@angular/material/dialog';

@NgModule({
  declarations: [FormControlComponent, ModalComponent, DialogComponent],
  exports: [FormControlComponent, ModalComponent, DialogComponent],
  imports: [ReactiveFormsModule, CommonModule, MatDialogModule],
})
export class SharedModule {}
