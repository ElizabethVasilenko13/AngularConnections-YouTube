import { IYouTubeApiItem } from './search-item.model';

export interface IYouTubeApiResponse {
  TODO: string;
  kind: string;
  etag: string;
  pageInfo: IPageInfo;
  items: IYouTubeApiItem[];
}

export interface IPageInfo {
  totalResults: number;
  resultsPerPage: number;
}
