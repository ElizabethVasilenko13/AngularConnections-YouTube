import { MemoizedSelector, createFeatureSelector, createSelector } from '@ngrx/store';
import { IYouTubeCustomItem, IYouTubeItem } from '@shared/models/search-item.model';

export const selectVideosFeature = createFeatureSelector<Record<string, IYouTubeItem>>('videos');
export const selectCustomVideosFeature = createFeatureSelector<IYouTubeCustomItem[]>('customVideos');
export const selectFavoriteVideosIdsFeature = createFeatureSelector<string[]>('favoriteVideosIds');
export const selectVideosIdsFeature = createFeatureSelector<string[]>('videosIds');

export const selectVideosList = createSelector(
  selectVideosFeature,
  selectVideosIdsFeature,
  (videos, videosIds) => videosIds.map((id) => videos[id])
);

export const selectFavoriteList = createSelector(
  selectVideosFeature,
  selectFavoriteVideosIdsFeature,
  (videos, favoriteVideosIds) => favoriteVideosIds.map((id) => videos[id])
);

export const selectVideoInFavorites = (videoId: string): VideoInFavoriteType =>
  createSelector(selectFavoriteVideosIdsFeature, (favoriteVideosIds) => favoriteVideosIds.includes(videoId));


export const selectVideoByIndex = (id: number):VideoByIndexType => createSelector(
  selectCustomVideosFeature,
  (customVideos: IYouTubeCustomItem[]) => customVideos[id]
);

type VideoInFavoriteType = MemoizedSelector<object, boolean, (s1: string[]) => boolean>;
type VideoByIndexType = MemoizedSelector<object, IYouTubeCustomItem, (s1: IYouTubeCustomItem[]) => IYouTubeCustomItem>