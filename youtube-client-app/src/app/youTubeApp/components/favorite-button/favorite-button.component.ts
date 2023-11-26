import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { selectVideoInFavorites } from 'src/app/redux/selectors/videos.selector';

@Component({
  selector: 'app-favorite-button',
  templateUrl: './favorite-button.component.html',
  styleUrl: './favorite-button.component.scss',
})
export class FavoriteButtonComponent implements OnInit {
  @Input() videoId!: string;
  @Output() addToFavorites = new EventEmitter<void>();
  @Output() removeFromFavorites = new EventEmitter<void>();
  isInFavorites$!: Observable<boolean>;

  constructor(private store: Store) {}

  ngOnInit(): void {
    this.isInFavorites$ = this.store.select(selectVideoInFavorites(this.videoId));
  }
}
