import { createFeatureSelector, createSelector } from '@ngrx/store';
import { IYouTubeCustomItem, IYouTubeItem } from '@shared/models/search-item.model';

export const selectVideosFeature = createFeatureSelector<Record<string, IYouTubeItem>>('videos');
export const selectCustomVideosFeature = createFeatureSelector<IYouTubeCustomItem[]>('customVideos');
export const selectFavoriteVideosIdsFeature = createFeatureSelector<string[]>('favoriteVideosIds');

export const selectVideoList = createSelector(
  selectVideosFeature,
  (state) => Object.values(state ?? {})
);

export const selectFavoriteList = createSelector(
  selectVideosFeature,
  selectFavoriteVideosIdsFeature,
  (videos, favoriteVideosIds) => favoriteVideosIds.map((id) => videos[id])
);

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export const selectVideoInFavorites = (videoId: string) =>
  createSelector(selectFavoriteVideosIdsFeature, (favoriteVideosIds) => favoriteVideosIds.includes(videoId));

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export const selectVideoByIndex = (id: number) => createSelector(
  selectCustomVideosFeature,
  (customVideos: IYouTubeCustomItem[]) => customVideos[id]
);
