import { createAction, props } from '@ngrx/store';
import { IYouTubeItem } from '@shared/models/search-item.model';

export const videosLoaded = createAction(
  '[YouTube API] Videos Loaded Success',
  props<{ videos: IYouTubeItem[] }>(),
);

export const loadVideos = createAction('[YouTube API] Load Videos');
