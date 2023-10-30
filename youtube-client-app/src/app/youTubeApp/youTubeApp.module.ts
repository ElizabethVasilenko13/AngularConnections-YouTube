import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SortingComponent } from './components/sorting/sorting.component';

@NgModule({
  declarations: [SortingComponent],
  exports: [SortingComponent],
  imports: [
    CommonModule
  ]
})
export class YouTubeAppModule { }
