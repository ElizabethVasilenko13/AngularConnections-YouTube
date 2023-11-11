import { Injectable } from '@angular/core';
import { IYouTubeApiItem } from 'src/app/shared/models/search-item.model';

@Injectable()
export class SortingService {
  activeSortKey?: string;
  activeSortDirection: 'asc' | 'desc' = 'asc';

  toggleSortDirection(): void {
    this.activeSortDirection = this.activeSortDirection === 'asc' ? 'desc' : 'asc';
  }

  isSortBtnActive(key: string): boolean {
    return key === this.activeSortKey;
  }

  isDescSorting(key: string): boolean {
    return this.isSortBtnActive(key) && this.activeSortDirection === 'desc';
  }

  isAscSorting(key: string): boolean {
    return this.isSortBtnActive(key) && this.activeSortDirection === 'asc';
  }

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
}
