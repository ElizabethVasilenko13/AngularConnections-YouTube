import { Pipe, PipeTransform } from '@angular/core';
import { SortComparator } from '@core/models/sorting.model';
import { IYouTubeItem } from '@shared/models/search-item.model';

@Pipe({
  name: 'sortBy'
})
export class SortBy implements PipeTransform {
  transform(value: IYouTubeItem[], comparator: SortComparator): IYouTubeItem[] {
    return value.slice().sort(comparator);
  }
}
