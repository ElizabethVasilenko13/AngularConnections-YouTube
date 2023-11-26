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

export interface IVideosPageInfoResponse {
  videos: IYouTubeItem[];
  pageInfo: IpageInfo;
}

export interface IpageInfo {
  nextPageToken?: string;
  prevPageToken?: string;
}

export interface IpageInfoO {
  currentPage: number;
  pageTokens: IpageInfo;
}

export interface IPageInfo {
  totalResults: number;
  resultsPerPage: number;
}
