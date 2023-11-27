import { createAction, props } from '@ngrx/store';

export const openVideo = createAction('[Result Page] Open Video', props<{ videoId: string }>());

export const loadNextPage = createAction('[YouTube API] Load Next Page');
export const loadPrevPage = createAction('[YouTube API] Load Previous Page');
