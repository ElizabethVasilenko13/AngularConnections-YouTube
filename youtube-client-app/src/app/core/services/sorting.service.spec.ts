import { TestBed } from '@angular/core/testing';
import { SortingState } from '@core/models/sorting.model';
import { IYouTubeItem } from '@shared/models/search-item.model';
import { SortingService } from './sorting.service';

describe('SortingService', () => {
  let sortingService: SortingService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SortingService],
    });
    sortingService = TestBed.inject(SortingService);
  });

  it('should be created', () => {
    expect(sortingService).toBeTruthy();
  });

  it('should set sorting state', () => {
    const sortingState: SortingState = {
      key: 'date',
      order: 'asc',
      comparator: () => 0,
    };

    sortingService.setSortingState(sortingState);
    expect(sortingService.sortingStateSource$.value).toEqual(sortingState);
  });

  it('should have correct date comparator', () => {
    const item1: IYouTubeItem = { snippet: { publishedAt: '2023-01-01T00:00:00Z' } } as IYouTubeItem;
    const item2: IYouTubeItem = { snippet: { publishedAt: '2023-01-02T00:00:00Z' } } as IYouTubeItem;

    const result = sortingService.dateComparator(item1, item2);
    expect(result).toBeLessThan(0);
  });

  it('should have correct views comparator', () => {
    const item1: IYouTubeItem = { statistics: { viewCount: '100' } } as IYouTubeItem;
    const item2: IYouTubeItem = { statistics: { viewCount: '200' } } as IYouTubeItem;

    const result = sortingService.viewsComparator(item1, item2);
    expect(result).toBeLessThan(0);
  });

  it('should return true for isDescSorting', () => {
    const sortingState: SortingState = { key: 'date', order: 'desc', comparator: () => 0 };
    sortingService.setSortingState(sortingState);

    const result = sortingService.isDescSorting('date');
    expect(result).toBeTruthy();
  });

  it('should return true for isAscSorting', () => {
    const sortingState: SortingState = { key: 'views', order: 'asc', comparator: () => 0 };
    sortingService.setSortingState(sortingState);

    const result = sortingService.isAscSorting('views');
    expect(result).toBeTruthy();
  });
  it('should return false for isAscSorting', () => {
    const sortingState: SortingState = { key: 'views', order: 'desc', comparator: () => 0 };
    sortingService.setSortingState(sortingState);

    const result = sortingService.isAscSorting('views');
    expect(result).toBeFalsy();
  });
});