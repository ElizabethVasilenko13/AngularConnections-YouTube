import { createFeatureSelector, createSelector } from '@ngrx/store';
import { IYouTubeCustomItem, IYouTubeItem } from '@shared/models/search-item.model';

export const selectVideosFeature = createFeatureSelector<Record<string, IYouTubeItem>>('videos');
export const selectCustomVideosFeature = createFeatureSelector<IYouTubeCustomItem[]>('customVideos');

export const selectVideoList = createSelector(
  selectVideosFeature,
  (state) => Object.values(state ?? {})
);

// export const selectVideoByIndexFactory = (index: number) =>
//   createSelector(
//     selectCustomVideosFeature,
//     (customVideos: IYouTubeCustomItem[]) => customVideos[index]
//   );

// export const selectVideoByIndex = createSelector(
//   selectCustomVideosFeature,
//   (customVideos: IYouTubeCustomItem[], id: number) => customVideos[id]
// );

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export const selectVideoByIndex = (id: number) => createSelector(
  selectCustomVideosFeature,
  (customVideos: IYouTubeCustomItem[]) => customVideos[id]
);
// export const selectFavoriteVideoList = createSelector(
//   selectVideosState,
//   selectFavoriteVideos,
//   (videos, favoriteIds) => favoriteIds.map((id) => videos[id])
// );