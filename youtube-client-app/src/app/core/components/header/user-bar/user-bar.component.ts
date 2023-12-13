import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ADMIN_PAGE_ROUTE } from '@core/consts';
import { AuthService } from '@services/auth.service';

@Component({
  selector: 'app-user-bar',
  templateUrl: './user-bar.component.html',
  styleUrls: ['./user-bar.component.scss'],
})
export class UserBarComponent {
  constructor(
    public auth: AuthService,
    private route: Router,
  ) {}

  logout(): void {
    this.auth.logout();
  }

  redirectToAdmin(): void {
    this.route.navigate([ADMIN_PAGE_ROUTE]);
  }
}
