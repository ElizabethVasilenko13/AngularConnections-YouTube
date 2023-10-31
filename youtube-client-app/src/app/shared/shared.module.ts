import { NO_ERRORS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MockDataService } from './services/mockDataService.service';
import { ButtonComponent } from './ui/button/button.component';
import { DataSharingService } from './services/dataSharingService.service';
import { DateBorderDirective } from './directives/date-border.directive';
import { TitleFilterPipe } from './pipes/title-filter.pipe';

@NgModule({
  declarations: [ButtonComponent, DateBorderDirective, TitleFilterPipe],
  exports: [ButtonComponent, DateBorderDirective, TitleFilterPipe],
  imports: [CommonModule],
  providers: [MockDataService, DataSharingService],
  schemas: [NO_ERRORS_SCHEMA]
})
export class SharedModule {}
