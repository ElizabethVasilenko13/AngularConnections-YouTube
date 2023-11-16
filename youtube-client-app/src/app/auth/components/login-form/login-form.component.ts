import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LoggerService } from 'src/app/core/services/logger.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss']
})
export class LoginFormComponent {
  constructor(private auth: AuthService, private router: Router, private logger: LoggerService) {}

  onSubmit(): void {
    this.auth.login();
    this.router.navigate(['/main']);
    this.logger.logMessage('Login');
  }
}
