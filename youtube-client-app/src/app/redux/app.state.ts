import { IYouTubeCustomItem, IYouTubeItem } from '@shared/models/search-item.model';

export interface AppState {
  videos: Record<string, IYouTubeItem>;
  customVideos: IYouTubeCustomItem[];
  favoriteVideos: string[];
}

export const initialState: AppState = {
  videos: {},
  customVideos: [],
  favoriteVideos: [],
};
