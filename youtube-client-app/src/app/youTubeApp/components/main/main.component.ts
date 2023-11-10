import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { SearchService } from 'src/app/services/searchService.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
})
export class MainComponent implements OnInit, OnDestroy {
  isSortingVisible = false;
  private subscriptions: Subscription[] = [];

  constructor(public searchService: SearchService) {}

  ngOnInit(): void {
    this.subscriptions.push(
      this.searchService.isSearchResultVisibleSource$.subscribe((isVisible) => {
        this.isSortingVisible = isVisible;
      })
    );
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((subscription) => {
      subscription.unsubscribe();
    });
  }
}
