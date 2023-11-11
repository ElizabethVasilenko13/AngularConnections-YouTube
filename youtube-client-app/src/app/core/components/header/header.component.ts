import { Component } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})

export class HeaderComponent {
  isSortingBlockVisible = false;

  toggleShowFiltersBtn(): void {
    this.isSortingBlockVisible = !this.isSortingBlockVisible;
  }
}
