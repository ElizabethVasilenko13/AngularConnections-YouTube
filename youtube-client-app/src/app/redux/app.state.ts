import { IYouTubeCustomItem, IYouTubeItem } from '@shared/models/search-item.model';
import { IpageInfo } from '@shared/models/search-response.model';

export interface AppState {
  videos: Record<string, IYouTubeItem>;
  customVideos: IYouTubeCustomItem[];
  favoriteVideosIds: string[];
  videosIds: string[];
  pageInfo: {
    currentPage: number;
    pageTokens: IpageInfo;
  };
}

export const initialState: AppState = {
  videos: {},
  customVideos: [],
  favoriteVideosIds: [],
  videosIds: [],
  pageInfo: {
    currentPage: 0,
    pageTokens: {},
  },
};
