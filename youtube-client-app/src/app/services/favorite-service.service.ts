import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { addToFavorites, removeFromFavorites } from '../redux/reducers/youtube.reducers';

@Injectable({
  providedIn: 'root'
})
export class FavoriteService {
  constructor(private store: Store) { }

  addToFavorites(id: string): void {
    this.store.dispatch(addToFavorites({videoId: id}));
  }

  removeFromFavorites(id: string): void {
    this.store.dispatch(removeFromFavorites({videoId: id}));
  }
}
