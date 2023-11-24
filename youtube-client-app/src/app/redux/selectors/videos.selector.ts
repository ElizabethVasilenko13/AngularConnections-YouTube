import { createFeatureSelector, createSelector } from '@ngrx/store';
import { IYouTubeApiItem } from '@shared/models/search-item.model';
import { AppState } from '../app.state';

// export const selectApiVideos = createSelector(
//   (state: AppState) => state.apiVideos,
//   (apiVideos) => apiVideos
// );

export const selectFeature = createFeatureSelector<AppState>('apiVideos');

// Modify the selector to select apiVideos from the feature state
export const selectVideos = createSelector(selectFeature, (state: AppState) => state.apiVideos);

// export const selectVideos  = createFeatureSelector<IYouTubeApiItem[]>('apiVideos');

// export const selectApiVideos = createSelector(
//   selectVideos,
//   (state: AppState) => state.apiVideos
// );
export const selectApiVideos = (state: AppState): IYouTubeApiItem[] => state.apiVideos;
