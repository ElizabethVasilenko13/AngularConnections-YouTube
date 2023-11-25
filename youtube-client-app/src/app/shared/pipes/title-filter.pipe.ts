import { Pipe, PipeTransform } from '@angular/core';
import { IYouTubeItem } from '../models/search-item.model';

@Pipe({
  name: 'titleFilter',
})
export class TitleFilterPipe implements PipeTransform {
  transform(videos: IYouTubeItem[], searchText: string): IYouTubeItem[] {
    if (!searchText) {
      return videos;
    }

    return videos.filter((video) => video.snippet.title.toLowerCase().includes(searchText.toLowerCase()));
  }
}
