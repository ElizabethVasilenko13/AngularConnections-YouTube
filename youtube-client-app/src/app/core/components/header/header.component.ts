import { Component } from '@angular/core';
import { AuthService } from 'src/app/auth/services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})

export class HeaderComponent {
  isSortingBlockVisible = false;

  constructor(
    private auth: AuthService
  ) {}

  toggleShowFiltersBtn(): void {
    this.isSortingBlockVisible = !this.isSortingBlockVisible;
  }

  logout(): void {
    this.auth.logout();
  }
}
