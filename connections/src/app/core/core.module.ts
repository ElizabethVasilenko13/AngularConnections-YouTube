import { NotFoundComponent } from './components/not-found/not-found.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '@shared/shared.module';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { UserCredentialInterceptor } from './interceptors/user-interseptor.service';

@NgModule({
  declarations: [HeaderComponent, FooterComponent, NotFoundComponent],
  exports: [HeaderComponent, FooterComponent, NotFoundComponent],
  imports: [CommonModule, SharedModule],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: UserCredentialInterceptor,
      multi: true,
    },
  ],
})
export class CoreModule {}
