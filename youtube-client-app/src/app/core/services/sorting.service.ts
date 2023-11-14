import { Injectable } from '@angular/core';
import { IYouTubeApiItem } from 'src/app/shared/models/search-item.model';

@Injectable()
export class SortingService {
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
