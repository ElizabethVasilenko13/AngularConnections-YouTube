import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControlComponent } from './components/form-control/form-control.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [FormControlComponent],
  exports: [FormControlComponent],
  imports: [ReactiveFormsModule, CommonModule],
})
export class SharedModule {}
