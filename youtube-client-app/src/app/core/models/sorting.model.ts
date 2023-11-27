import { IYouTubeApiItem } from '@shared/models/search-item.model';

export interface SortingState {
  key: string;
  order: string;
  comparator: SortComparator;
}

export type SortComparator = (a: IYouTubeApiItem, b: IYouTubeApiItem) => number;
