import { MemoizedSelector, createFeatureSelector, createSelector } from '@ngrx/store';
import { State } from '@redux/app.state';
import { IYouTubeCustomItem } from '@shared/models/search-item.model';

type VideoInFavoriteType = MemoizedSelector<object, boolean, (s1: string[]) => boolean>;
type VideoByIndexType = MemoizedSelector<object, IYouTubeCustomItem, (s1: IYouTubeCustomItem[]) => IYouTubeCustomItem>;

export const selectVideosFeature = createFeatureSelector<State>('videos');

export const selectVideoLoading = createSelector(
  selectVideosFeature, (state: State) => state.isLoading
);

export const selectAllVideos = createSelector(
  selectVideosFeature, (state: State) => state.allVideos
);

export const selectCustomVideos = createSelector(
  selectVideosFeature, (state: State) => state.customVideos
);

export const selectFavoriteVideosIds = createSelector(
  selectVideosFeature, (state: State) => state.favoriteVideosIds
);

export const selectVideosIds = createSelector(
  selectVideosFeature, (state: State) => state.videosIds
);

export const selectPageIngo = createSelector(
  selectVideosFeature, (state: State) => state.pageInfo
);

export const selectVideosList = createSelector(
  selectAllVideos,
  selectVideosIds,
  (videos, videosIds) => videosIds.map((id) => videos[id]),
);

export const selectCurrnetPageNumList = createSelector(
  selectPageIngo,
  (pageInfo) => pageInfo.currentPage
);

export const selectFavoriteList = createSelector(
  selectAllVideos,
  selectFavoriteVideosIds,
  (videos, favoriteVideosIds) => favoriteVideosIds.map((id) => videos[id]),
);

export const selectVideoInFavorites = (videoId: string): VideoInFavoriteType =>
  createSelector(selectFavoriteVideosIds, (favoriteVideosIds) => favoriteVideosIds.includes(videoId));

export const selectVideoByIndex = (id: number): VideoByIndexType =>
  createSelector(selectCustomVideos, (customVideos: IYouTubeCustomItem[]) => customVideos[id]);

