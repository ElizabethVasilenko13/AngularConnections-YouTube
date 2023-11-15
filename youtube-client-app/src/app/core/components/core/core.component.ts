import { Component, OnInit, ViewChild } from '@angular/core';
import {  Router } from '@angular/router';
import { SearchService } from 'src/app/services/searchService.service';
import { SearchResultComponent } from 'src/app/youTubeApp/pages/search-result-page/search-result.component';

@Component({
  selector: 'app-core',
  templateUrl: './core.component.html',
  styleUrls: ['./core.component.scss']
})
export class CoreComponent implements OnInit{
  @ViewChild('result') result!: SearchResultComponent;
  isMainPageRoute = false;

  constructor(private router: Router, public searchService: SearchService) {}

  ngOnInit(): void {
    this.router.events.subscribe(() => {
      this.isMainPageRoute = this.router.url === '/main';
    });
  }
}
