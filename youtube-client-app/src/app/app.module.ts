import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SharedModule } from './shared/shared.module';
import { CoreModule } from './core/core.module';
import { YouTubeAppModule } from './youTubeApp/youTubeApp.module';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [BrowserModule, AppRoutingModule, SharedModule, CoreModule, YouTubeAppModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
