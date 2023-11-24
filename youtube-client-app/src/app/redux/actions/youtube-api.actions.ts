import { createAction, props } from '@ngrx/store';
import { IYouTubeApiItem } from '@shared/models/search-item.model';

export const videosLoaded = createAction(
  '[YouTube API] Videos Loaded Success',
  props<{ apiVideos: IYouTubeApiItem[] }>(),
);

export const loadVideos = createAction('[YouTube API] Load Videos');
