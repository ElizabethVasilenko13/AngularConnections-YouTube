import { NotFoundComponent } from './components/not-found/not-found.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '@shared/shared.module';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { UserCredentialInterceptor } from './interceptors/user-interseptor.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';

@NgModule({
  declarations: [NotFoundComponent],
  exports: [NotFoundComponent],
  imports: [CommonModule, SharedModule, HttpClientModule, BrowserAnimationsModule, BrowserModule],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: UserCredentialInterceptor,
      multi: true,
    },
  ],
})
export class CoreModule {}
