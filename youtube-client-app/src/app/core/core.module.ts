import { NO_ERRORS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './components/header/header.component';
import { SharedModule } from '../shared/shared.module';
import { YouTubeAppModule } from '../youTubeApp/youTubeApp.module';
import { ButtonComponent } from '../shared/ui/button/button.component';
import { MockDataService } from './services/mockDataService.service';
import { DataSharingService } from './services/dataSharingService.service';

@NgModule({
  declarations: [HeaderComponent],
  exports: [HeaderComponent],
  imports: [
    CommonModule,
    SharedModule,
    YouTubeAppModule,
    ButtonComponent
  ],
  providers: [MockDataService, DataSharingService],
  schemas: [NO_ERRORS_SCHEMA]
})
export class CoreModule { }
