import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MockDataService } from './services/mockDataService.service';

@NgModule({
  declarations: [],
  imports: [CommonModule],
  providers: [MockDataService],
})
export class SharedModule {}
