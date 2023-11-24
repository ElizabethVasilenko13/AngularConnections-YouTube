import { createFeatureSelector, createSelector } from '@ngrx/store';
import { AppState } from '../app.state';

 export const selectVideosFeature = createFeatureSelector<AppState>('videos');

export const selectVideoList = createSelector(
  selectVideosFeature,
  (state: AppState) => Object.values(state.videos)
);

// export const selectFavoriteVideoList = createSelector(
//   selectVideosState,
//   selectFavoriteVideos,
//   (videos, favoriteIds) => favoriteIds.map((id) => videos[id])
// );