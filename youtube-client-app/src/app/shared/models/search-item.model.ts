export interface IYouTubeCustomItem {
  title: string;
  description?: string;
  img: string;
  link: string;
  date: string;
  tags: string[];
}

export interface IYouTubeApiItem {
  kind: string;
  etag: string;
  id: {
    kind: string;
    videoId: string;
  };
  snippet: ISnippet;
  statistics?: IStatistics;
}

export interface IYouTubeItem {
  kind: string;
  etag: string;
  id: string;
  snippet: ISnippet;
  statistics?: IStatistics;
}

export interface IYouTubeApiItemResponse {
  kind: string;
  etag: string;
  items: IYouTubeItem[];
}

export interface ISnippet {
  publishedAt: string;
  channelId: string;
  title: string;
  description: string;
  thumbnails: IThumbnails;
  channelTitle: string;
  tags: string[];
  categoryId: string;
  liveBroadcastContent: string;
  localized: ILocalized;
  defaultAudioLanguage: string;
  defaultLanguage?: string;
}

export interface IThumbnails {
  default: IThumbnail;
  medium: IThumbnail;
  high: IThumbnail;
  standard: IThumbnail;
  maxres: IThumbnail;
}

export interface IThumbnail {
  url: string;
  width: number;
  height: number;
}

export interface ILocalized {
  title: string;
  description: string;
}

export interface IStatistics {
  viewCount: string;
  likeCount: string;
  dislikeCount?: string;
  favoriteCount: string;
  commentCount: string;
}
