import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { createEffect, Actions, ofType } from '@ngrx/effects';
import { YoutubeService } from '@services/youtubeService.service';
import { map, exhaustMap } from 'rxjs/operators';
import { loadVideos, videosLoaded } from '../actions/youtube-api.actions';

@Injectable()
export class YouTubeApiEffects {
  constructor(
    private youTubeService: YoutubeService,
    private actions$: Actions,
    private store: Store,
  ) {}

  loadVideos$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadVideos),
      exhaustMap(({ pageToken }) =>
        this.youTubeService
          .getVideos(pageToken)
          .pipe(map(({ videos, pageInfo }) => videosLoaded({ videos, pageInfo }))),
      ),
    ),
  );
}
