import { IYouTubeApiItem } from './search-item.model';

export interface IYouTubeApiResponse {
  kind: string;
  etag: string;
  pageInfo: IPageInfo;
  items: IYouTubeApiItem[];
  redionCode: string;
  nextPageToken?: string;
  prevPageToken?: string;
}

export interface IPageInfo {
  totalResults: number;
  resultsPerPage: number;
}
