import { createReducer, on } from '@ngrx/store';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { IYouTubeCustomItem, IYouTubeItem } from '@shared/models/search-item.model';
import { initialState } from '../app.state';

import { loadVideos, videosLoaded } from '../actions/youtube-api.actions';
import { deleteVideo, videoCreated } from '../actions/admin-page.actions';

export const videosReducer = createReducer<Record<string, IYouTubeItem>>(
  initialState.videos,
  on(videosLoaded, (state, { videos }) => {
    const apiVideos: Record<string, IYouTubeItem> = {};
    videos.forEach((video) => {
      apiVideos[video.id] = video;
    });
    return { ...state, ...apiVideos };
  }),
  on(loadVideos, (state): Record<string, IYouTubeItem> => state)
);

export const videosIdsReducer = createReducer<string[]>(
  initialState.videosIds,
  on(videosLoaded, (_, { videos }) => videos.map((video) => video.id)),
  on(loadVideos, (state): string[] => state)
);

export const favoritesSlice = createSlice({
  name: 'favorites',
  initialState: initialState.favoriteVideosIds,
  reducers: {
    addToFavorites: (state, action: PayloadAction<{ videoId: string }>) => {
      state.push(action.payload.videoId);
    },
    removeFromFavorites: (state, action: PayloadAction<{ videoId: string }>) =>
      state.filter((id) => id !== action.payload.videoId),
  },
});

export const { addToFavorites, removeFromFavorites } = favoritesSlice.actions;

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


