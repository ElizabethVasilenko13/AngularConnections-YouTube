import { IYouTubeCustomItem, IYouTubeItem } from '@shared/models/search-item.model';

export interface AppState {
  videos: Record<string, IYouTubeItem>;
  customVideos: IYouTubeCustomItem[];
  favoriteVideos: string[];
  currentPage: 1;
  pageTokens: Record<number, string>;
}

export const initialState: AppState = {
  videos: {},
  customVideos: [],
  favoriteVideos: [],
  currentPage: 1,
  pageTokens: {},
};
