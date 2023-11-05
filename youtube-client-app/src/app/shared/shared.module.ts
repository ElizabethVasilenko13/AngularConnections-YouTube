import { NO_ERRORS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DateBorderDirective } from './directives/date-border.directive';
import { TitleFilterPipe } from './pipes/title-filter.pipe';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { ButtonComponent } from './ui/button/button.component';

@NgModule({
  declarations: [DateBorderDirective, TitleFilterPipe, NotFoundComponent],
  exports: [DateBorderDirective, TitleFilterPipe, NotFoundComponent],
  imports: [CommonModule, ButtonComponent],
  providers: [],
  schemas: [NO_ERRORS_SCHEMA]
})
export class SharedModule {}
