import { createReducer, on } from '@ngrx/store';
import { AppState, initialState } from '../app.state';
import { loadVideos, videosLoaded } from '../actions/youtube-api.actions';
import { addToFavorites, removeFromFavorites } from '../actions/favorite.actions';

export const youTubeApiReducers = createReducer<AppState>(
  initialState,
  on(videosLoaded, (state, { videos }) => {
    const apiVideos = { ...state.videos };
    videos.forEach((video) => {
      apiVideos[video.id] = video;
    });
    return { ...state, videos: apiVideos };
  }),
  on(loadVideos, (state): AppState => state),
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


