import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss']
})
export class LoginFormComponent {
  constructor(private auth: AuthService, private router: Router) {}

  onSubmit(): void {
    this.auth.login();
    this.router.navigate(['/main']);
  }
}
