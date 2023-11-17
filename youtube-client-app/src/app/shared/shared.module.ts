import { NO_ERRORS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TitleFilterPipe } from './pipes/title-filter.pipe';
import { ButtonComponent } from './ui/button/button.component';
import { DateColorDirective } from './directives/date-color.directive';
// import { passwordStrengthValidator } from './validators/password-strength';

@NgModule({
  declarations: [DateColorDirective, TitleFilterPipe],
  exports: [DateColorDirective, TitleFilterPipe, ButtonComponent],
  imports: [CommonModule, ButtonComponent],
  providers: [],
  schemas: [NO_ERRORS_SCHEMA],
})
export class SharedModule {}
