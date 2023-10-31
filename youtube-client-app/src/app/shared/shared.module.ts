import { NO_ERRORS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MockDataService } from './services/mockDataService.service';
import { DataSharingService } from './services/dataSharingService.service';
import { DateBorderDirective } from './directives/date-border.directive';
import { TitleFilterPipe } from './pipes/title-filter.pipe';

@NgModule({
  declarations: [DateBorderDirective, TitleFilterPipe],
  exports: [DateBorderDirective, TitleFilterPipe],
  imports: [CommonModule],
  providers: [MockDataService, DataSharingService],
  schemas: [NO_ERRORS_SCHEMA]
})
export class SharedModule {}
