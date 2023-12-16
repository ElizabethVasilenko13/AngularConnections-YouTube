import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControlComponent } from './components/form-control/form-control.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ModalComponent } from './components/modal/modal.component';

@NgModule({
  declarations: [FormControlComponent, ModalComponent],
  exports: [FormControlComponent, ModalComponent],
  imports: [ReactiveFormsModule, CommonModule],
})
export class SharedModule {}
