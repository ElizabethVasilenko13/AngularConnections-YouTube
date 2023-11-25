import { Pipe, PipeTransform } from '@angular/core';
import { SortComparator } from '@core/models/sorting.model';
import { IYouTubeItem } from '@shared/models/search-item.model';

@Pipe({
  name: 'sortBy',
<<<<<<< HEAD
})
export class SortBy implements PipeTransform {
  transform(value: IYouTubeApiItem[], comparator: SortComparator):  IYouTubeApiItem[] {
    return value.slice().sort(comparator);
  }
}
=======
  standalone: true,
})
export class SortBy implements PipeTransform {
  transform(value: IYouTubeItem[], comparator: SortComparator): IYouTubeItem[] {
    return value.slice().sort(comparator);
  }
}
>>>>>>> 0e4fcbc (feat: implement redux for api, update sort)
