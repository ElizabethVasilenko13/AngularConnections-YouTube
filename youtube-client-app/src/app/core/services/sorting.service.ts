import { Injectable } from '@angular/core';
import { SortingState } from '@core/models/sorting.model';
import { IYouTubeItem } from '@shared/models/search-item.model';
import { BehaviorSubject } from 'rxjs';

@Injectable()
export class SortingService {
  public sortingStateSource$ = new BehaviorSubject<SortingState>({
    key: '',
    order: '',
    comparator: (): number => 0,
  });

  setSortingState(sortingState: SortingState): void {
    this.sortingStateSource$.next(sortingState);
  }

  dateComparator(a: IYouTubeItem, b: IYouTubeItem): number {
    const valueA = new Date(a.snippet.publishedAt).getTime();
    const valueB = new Date(b.snippet.publishedAt).getTime();
    return valueA - valueB;
  }

  viewsComparator(a: IYouTubeItem, b: IYouTubeItem): number {
    if (a.statistics && b.statistics) {
      const valueA = +a.statistics.viewCount;
      const valueB = +b.statistics.viewCount;
      return valueA - valueB;
    }
    return 0;
  }

  isDescSorting(key: string): boolean {
    return this.sortingStateSource$.value.key === key && this.sortingStateSource$.value.order === 'desc';
  }

  isAscSorting(key: string): boolean {
    return this.sortingStateSource$.value.key === key && this.sortingStateSource$.value.order === 'asc';
  }
}