/* eslint-disable @ngrx/prefer-effect-callback-in-block-statement */
import { Injectable } from '@angular/core';
import { createEffect, Actions, ofType } from '@ngrx/effects';
import { loadVideos, videosLoadedSuccesful } from '@redux/actions/videos.actions';
import { YoutubeService } from '@services/youtubeService.service';
import { map, exhaustMap } from 'rxjs/operators';

@Injectable()
export class YouTubeApiEffects {
  constructor(
    private youTubeService: YoutubeService,
    private actions$: Actions,
  ) {}

  loadVideos$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadVideos),
      exhaustMap(({ pageToken, currentPage = 1 }) =>
        this.youTubeService
          .getVideos(pageToken)
          .pipe(map(({ allVideos, pageInfo }) => videosLoadedSuccesful({ allVideos, pageInfo, currentPage }))),
      ),
    ),
  );
}
