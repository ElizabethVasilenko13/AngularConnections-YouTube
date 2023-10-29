import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { SearchResultsComponent } from './components/main/search-results/search-results.component';
import { SearchItemComponent } from './components/main/search-item/search-item.component';
import { SortingComponent } from './components/sorting/sorting.component';
import { AuthorizationComponent } from './components/authorization/authorization.component';
import { RegistrationComponent } from './components/authorization/registration/registration.component';
import { MainComponent } from './components/main/main.component';
import { ButtonComponent } from './components/button/button.component';
import { SharedModule } from './shared/shared.module';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    SearchItemComponent,
    SearchResultsComponent,
    SearchItemComponent,
    SortingComponent,
    AuthorizationComponent,
    RegistrationComponent,
    MainComponent,
    ButtonComponent
  ],
  imports: [BrowserModule, AppRoutingModule, SharedModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
