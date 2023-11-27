import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MAIN_PAGE_ROUTE } from '@core/consts';
import { LoggerService } from '@core/services/logger.service';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss'],
})
export class LoginPageComponent implements OnInit {
  constructor(
    private auth: AuthService,
    private router: Router,
    private logger: LoggerService,
  ) {}

  ngOnInit(): void {
    if (this.auth.isLoggedIn()) {
      this.router.navigate([MAIN_PAGE_ROUTE]);
    }
  }

  onSubmit(): void {
    this.auth.login();
    this.router.navigate([MAIN_PAGE_ROUTE]);
    this.logger.logMessage('Login');
  }
}
