import { IYouTubeApiItem, IYouTubeItem } from './search-item.model';

export interface IYouTubeApiResponse {
  kind: string;
  etag: string;
  pageInfo: IPageInfo;
  items: IYouTubeApiItem[];
  redionCode: string;
  nextPageToken?: string;
  prevPageToken?: string;
}

export interface IVideosResponse {
  allVideos: IYouTubeItem[];
  pageInfo: IPageTokens;
}

export interface IPageTokens {
  nextPageToken?: string;
  prevPageToken?: string;
}

export interface IPaginationPageInfo {
  currentPage: number;
  pageTokens: IPageTokens;
}

export interface IPageInfo {
  totalResults: number;
  resultsPerPage: number;
}
