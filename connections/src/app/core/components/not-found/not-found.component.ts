import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-not-found',
  templateUrl: './not-found.component.html',
  styleUrls: ['./not-found.component.scss'],
})
export class NotFoundComponent {
  currentUrl: string;

  constructor(private router: Router) {
    this.currentUrl = window.location.href;
  }

  goToMain(): void {
    this.router.navigate(['/']);
  }
}
