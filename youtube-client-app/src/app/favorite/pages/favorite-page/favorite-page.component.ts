import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { IYouTubeItem } from '@shared/models/search-item.model';
import { Observable } from 'rxjs';
import { selectFavoriteList } from '@redux/selectors/videos.selector';

@Component({
  selector: 'app-favorite-page',
  templateUrl: './favorite-page.component.html',
  styleUrl: './favorite-page.component.scss',
})
export class FavoritePageComponent {
  favoriteVideos$: Observable<IYouTubeItem[]>;
  constructor(private store: Store) {
    this.favoriteVideos$ = this.store.select(selectFavoriteList);
  }
}
