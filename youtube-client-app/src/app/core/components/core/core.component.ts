import { Component } from '@angular/core';
import { SearchService } from 'src/app/services/searchService.service';

@Component({
  selector: 'app-core',
  templateUrl: './core.component.html',
  styleUrls: ['./core.component.scss']
})
export class CoreComponent {
  constructor(public searchService: SearchService) {}
}
