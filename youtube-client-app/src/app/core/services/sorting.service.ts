import { Injectable } from '@angular/core';
import { SearchService } from 'src/app/services/searchService.service';
import { IYouTubeApiItem } from 'src/app/shared/models/search-item.model';

@Injectable()
export class SortingService {

  constructor(
    private searchService: SearchService,
  ) {}

  dateComparator(a: IYouTubeApiItem, b: IYouTubeApiItem): number {
    const valueA = new Date(a.snippet.publishedAt).getTime();
    const valueB = new Date(b.snippet.publishedAt).getTime();
    return valueA - valueB;
  }

  viewsComparator(a: IYouTubeApiItem, b: IYouTubeApiItem): number {
    const valueA = +a.statistics.viewCount;
    const valueB = +b.statistics.viewCount;
    return valueA - valueB;
  }

  isDescSorting(key: string): boolean {
    return this.searchService.sortingStateSource$.value.key === key &&
      this.searchService.sortingStateSource$.value.order === 'desc';
  }

  isAscSorting(key: string): boolean {
    return this.searchService.sortingStateSource$.value.key === key
      && this.searchService.sortingStateSource$.value.order === 'asc';
  }
}
