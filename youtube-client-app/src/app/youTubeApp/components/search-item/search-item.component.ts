import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { IYouTubeApiItem } from '@shared/models/search-item.model';

@Component({
  selector: 'app-search-item',
  templateUrl: './search-item.component.html',
  styleUrls: ['./search-item.component.scss'],
})
export class SearchItemComponent {
  @Input() video!: IYouTubeApiItem;

  constructor(private router: Router) {}

  navigateToDetailsPage(): void {
    this.router.navigate(['detail', this.video.id]);
  }
}
