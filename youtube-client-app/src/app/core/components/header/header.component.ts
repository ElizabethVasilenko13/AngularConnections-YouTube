import { Component } from '@angular/core';
import { AuthService } from 'src/app/auth/services/auth.service';
import { SortingService } from '../../services/sorting.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})

export class HeaderComponent {
  isSortingBlockVisible = false;

  constructor(
    public sortingService: SortingService,
    private auth: AuthService
  ) {}

  toggleShowFiltersBtn(): void {
    this.isSortingBlockVisible = !this.isSortingBlockVisible;
  }

  logout(): void {
    this.auth.logout();
  }
}
