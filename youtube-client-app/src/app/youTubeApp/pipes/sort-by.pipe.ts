import { Pipe, PipeTransform } from '@angular/core';
import { SortComparator } from '@core/models/sorting.model';
import { IYouTubeApiItem } from '@shared/models/search-item.model';

@Pipe({
  name: 'sortBy',
})
export class SortBy implements PipeTransform {
  transform(value: IYouTubeApiItem[], comparator: SortComparator):  IYouTubeApiItem[] {
    return value.slice().sort(comparator);
  }
}