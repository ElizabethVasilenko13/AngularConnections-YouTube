import { createAction, props } from "@ngrx/store";
import { IYouTubeCustomItem, IYouTubeItem } from "@shared/models/search-item.model";
import { IPageTokens } from "@shared/models/search-response.model";

export const videosLoadedSuccesful = createAction('[YouTube API] Videos Loaded Success', props<{allVideos: IYouTubeItem[]; pageInfo: IPageTokens; currentPage: number}>());
export const loadVideos = createAction('[YouTube API] Load Videos', props<{ pageToken?: string; currentPage?: number }>());
export const loadVideosWithPageToken = createAction('[YouTube API] Load Videos', props<{ pageToken?: string }>());

export const openVideo = createAction('[Result Page] Open Video', props<{ videoId: string }>());

export const addToFavorites = createAction('[Favorite] Add to Favorites', props<{ videoId: string }>());
export const removeFromFavorites = createAction('[Favorite] Remove from Favorites', props<{ videoId: string }>());

export const videoCreated = createAction('[Admin] Video Created', props<{ video: IYouTubeCustomItem }>());
export const deleteVideo = createAction('[Admin] Delete Custom Video', props<{ videoId: number }>());
