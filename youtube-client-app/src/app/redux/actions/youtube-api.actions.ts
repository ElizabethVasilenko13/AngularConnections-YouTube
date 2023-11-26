import { createAction, props } from '@ngrx/store';
import { IYouTubeItem } from '@shared/models/search-item.model';
import { IVideosPageInfoResponse } from '@shared/models/search-response.model';

export const videosLoaded = createAction('[YouTube API] Videos Loaded Success', props<IVideosPageInfoResponse>());

export const loadVideos = createAction('[YouTube API] Load Videos', props<{ pageToken?: string }>());

export const loadVideosWithPageToken = createAction('[YouTube API] Load Videos', props<{ pageToken?: string }>());
