import { NO_ERRORS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { TitleFilterPipe } from './pipes/title-filter.pipe';
import { ButtonComponent } from './ui/button/button.component';
import { DateColorDirective } from './directives/date-color.directive';
import { FormControlComponent } from './components/form-control/form-control.component';

@NgModule({
  declarations: [DateColorDirective, TitleFilterPipe, FormControlComponent],
  exports: [DateColorDirective, TitleFilterPipe, FormControlComponent, ButtonComponent],
  imports: [CommonModule, ButtonComponent, ReactiveFormsModule],
  providers: [],
  schemas: [NO_ERRORS_SCHEMA],
})
export class SharedModule {}
