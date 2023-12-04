import { IYouTubeCustomItem, IYouTubeItem } from "@shared/models/search-item.model";
import { IPageTokens } from "@shared/models/search-response.model";

export interface State {
  isLoading: boolean;
  allVideos: Record<string, IYouTubeItem>;
  customVideos: IYouTubeCustomItem[];
  favoriteVideosIds: string[];
  videosIds: string[];
  pageInfo: {
    currentPage: number;
    pageTokens: IPageTokens;
  };
}

export const initialState: State = {
  isLoading: false,
  allVideos: {},
  customVideos: [],
  favoriteVideosIds: [],
  videosIds: [],
  pageInfo: {
    currentPage: 1,
    pageTokens: {},
  },
};