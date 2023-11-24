import { IYouTubeApiItem, IYouTubeCustomItem } from '@shared/models/search-item.model';

export interface AppState {
  apiVideos: IYouTubeApiItem[];
  customVideos: IYouTubeCustomItem[];
}

export const initialState: AppState = {
  apiVideos: [],
  customVideos: [],
};
