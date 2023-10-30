import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SearchResultsComponent } from './components/main/search-results/search-results.component';
import { SearchItemComponent } from './components/main/search-item/search-item.component';
import { SortingComponent } from './components/sorting/sorting.component';
import { AuthorizationComponent } from './components/authorization/authorization.component';
import { RegistrationComponent } from './components/authorization/registration/registration.component';
import { MainComponent } from './components/main/main.component';
import { SharedModule } from './shared/shared.module';
import { CoreModule } from './core/core.module';

@NgModule({
  declarations: [
    AppComponent,
    SearchItemComponent,
    SearchResultsComponent,
    SearchItemComponent,
    SortingComponent,
    AuthorizationComponent,
    RegistrationComponent,
    MainComponent,
  ],
  imports: [BrowserModule, AppRoutingModule, SharedModule, CoreModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
