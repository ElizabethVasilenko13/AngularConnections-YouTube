import { IYouTubeCustomItem, IYouTubeItem } from '@shared/models/search-item.model';

export interface AppState {
  videos: Record<string, IYouTubeItem>;
  customVideos: IYouTubeCustomItem[];
  favoriteVideosIds: string[];
  videosIds: string[];
  currentPage: 1;
  pageTokens: Record<number, string>;
}

export const initialState: AppState = {
  videos: {},
  customVideos: [],
  favoriteVideosIds: [],
  videosIds: [],
  currentPage: 1,
  pageTokens: {},
};
