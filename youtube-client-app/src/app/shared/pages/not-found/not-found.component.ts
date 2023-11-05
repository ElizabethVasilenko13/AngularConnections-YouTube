import { Component } from '@angular/core';
import { Location } from '@angular/common';

@Component({
  selector: 'app-not-found',
  templateUrl: './not-found.component.html',
  styleUrls: ['./not-found.component.scss']
})
export class NotFoundComponent {
  goBackButtonName = 'Go back';
  goBackButtonClassName = 'item__button';

  constructor(private location: Location) {}

  goBack(): void {
    this.location.back();
  }
}
