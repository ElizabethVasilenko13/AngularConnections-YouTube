import { IYouTubeItem } from '@shared/models/search-item.model';

export interface SortingState {
  key: string;
  order: string;
  comparator: SortComparator;
}

export type SortComparator = (a: IYouTubeItem, b: IYouTubeItem) => number;
