import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MAIN_PAGE_ROUTE } from '@core/constants/routing';

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
    this.router.navigate([MAIN_PAGE_ROUTE]);
  }
}
