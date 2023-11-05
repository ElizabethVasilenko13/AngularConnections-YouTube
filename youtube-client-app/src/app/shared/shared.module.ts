import { NO_ERRORS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DateBorderDirective } from './directives/date-border.directive';
import { TitleFilterPipe } from './pipes/title-filter.pipe';
import { NotFoundComponent } from './components/not-found/not-found.component';

@NgModule({
  declarations: [DateBorderDirective, TitleFilterPipe, NotFoundComponent],
  exports: [DateBorderDirective, TitleFilterPipe, NotFoundComponent],
  imports: [CommonModule],
  providers: [],
  schemas: [NO_ERRORS_SCHEMA]
})
export class SharedModule {}
