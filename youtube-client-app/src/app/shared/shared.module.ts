import { NO_ERRORS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MockDataService } from './services/mockDataService.service';
import { ButtonComponent } from './ui/button/button.component';

@NgModule({
  declarations: [ButtonComponent],
  exports: [ButtonComponent],
  imports: [CommonModule],
  providers: [MockDataService],
  schemas: [NO_ERRORS_SCHEMA]
})
export class SharedModule {}
