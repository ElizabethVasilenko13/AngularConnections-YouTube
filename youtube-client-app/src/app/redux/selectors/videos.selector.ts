import { createFeatureSelector, createSelector } from '@ngrx/store';
import { IYouTubeCustomItem, IYouTubeItem } from '@shared/models/search-item.model';

export const selectVideosFeature = createFeatureSelector<Record<string, IYouTubeItem>>('videos');
export const selectCustomVideosFeature = createFeatureSelector<IYouTubeCustomItem[]>('customVideos');
export const selectFavoriteVideosIdsFeature = createFeatureSelector<string[]>('favoriteVideos');

export const selectVideoList = createSelector(
  selectVideosFeature,
  (state) => Object.values(state ?? {})
);

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export const selectVideoInFavorites = (videoId: string) =>
  createSelector(selectFavoriteVideosIdsFeature, (favoriteVideos) => favoriteVideos.includes(videoId));

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export const selectVideoByIndex = (id: number) => createSelector(
  selectCustomVideosFeature,
  (customVideos: IYouTubeCustomItem[]) => customVideos[id]
);
