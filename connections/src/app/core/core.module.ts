import { NotFoundComponent } from './components/not-found/not-found.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '@shared/shared.module';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';

@NgModule({
  declarations: [HeaderComponent, FooterComponent, NotFoundComponent],
  exports: [HeaderComponent, FooterComponent, NotFoundComponent],
  imports: [CommonModule, SharedModule],
})
export class CoreModule {}
