import { Pipe, PipeTransform } from '@angular/core';
import { IYouTubeApiItem } from '../models/search-item.model';

@Pipe({
  name: 'titleFilter',
})

export class TitleFilterPipe implements PipeTransform {
  transform(videos: IYouTubeApiItem[], searchText: string): IYouTubeApiItem[] {
    if (!searchText) {
      return videos;
    }

    return videos.filter((video: IYouTubeApiItem) => video.snippet.title
      .toLowerCase().includes(searchText.toLowerCase()));
  }
}
