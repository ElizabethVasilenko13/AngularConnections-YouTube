import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '@auth/services/auth.service';

@Component({
  selector: 'app-user-bar',
  templateUrl: './user-bar.component.html',
  styleUrls: ['./user-bar.component.scss']
})
export class UserBarComponent {
  constructor(
    public auth: AuthService,
    private route: Router,
  ) {}

  logout(): void {
    this.auth.logout();
  }
}
