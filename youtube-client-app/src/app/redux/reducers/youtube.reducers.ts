import { createReducer, on } from '@ngrx/store';
import { IYouTubeCustomItem, IYouTubeItem } from '@shared/models/search-item.model';
import { AppState, initialState } from '../app.state';

import { loadVideos, videosLoaded } from '../actions/youtube-api.actions';
import { addToFavorites, removeFromFavorites } from '../actions/favorite.actions';
import { deleteVideo, videoCreated } from '../actions/admin-page.actions';


export const youTubeApiReducers = createReducer<Record<string, IYouTubeItem>>(
  initialState.videos,
  on(videosLoaded, (state, { videos }): Record<string, IYouTubeItem> => {
    const apiVideos: Record<string, IYouTubeItem> = {};
    videos.forEach((video) => {
      apiVideos[video.id] = video;
    });
    return { ...apiVideos };
  }),
  on(loadVideos, (state): Record<string, IYouTubeItem> => state),
);


export const favoriteReducers = createReducer<AppState>(
  initialState,
  on(addToFavorites, (state, { videoId }): AppState => {
    const favoriteVideos = [...state.favoriteVideos, videoId];
    return { ...state, favoriteVideos };
  }),
  on(removeFromFavorites, (state, { videoId }) => {
    const favoriteVideos = state.favoriteVideos.filter((id) => id !== videoId);
    return { ...state, favoriteVideos };
  }),
);

export const videoCreateReducers = createReducer<IYouTubeCustomItem[]>(
  initialState.customVideos,
  on(videoCreated, (state, { video }): IYouTubeCustomItem[] => {
    const customVideos = [...state, video];
    return customVideos;
  }),
  on(deleteVideo, (state, { videoId }): IYouTubeCustomItem[] => {
    const updatedVideos = [...state];
    updatedVideos.splice(videoId, 1);
    return updatedVideos;
  })
);


