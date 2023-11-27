import { createAction, props } from '@ngrx/store';
import { IYouTubeItem } from '@shared/models/search-item.model';
import { IPageTokens } from '@shared/models/search-response.model';

export const videosLoaded = createAction('[YouTube API] Videos Loaded Success', props<{videos: IYouTubeItem[]; pageInfo: IPageTokens; currentPage: number}>());

export const loadVideos = createAction('[YouTube API] Load Videos', props<{ pageToken?: string; currentPage?: number }>());

export const loadVideosWithPageToken = createAction('[YouTube API] Load Videos', props<{ pageToken?: string }>());
