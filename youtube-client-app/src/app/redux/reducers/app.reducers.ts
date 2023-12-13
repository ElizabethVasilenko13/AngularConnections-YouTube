import { Action, ActionReducer, createReducer, on } from '@ngrx/store';
import { IYouTubeItem } from '@shared/models/search-item.model';
import {
  addToFavorites,
  deleteVideo,
  loadVideos,
  removeFromFavorites,
  videoCreated,
  videosLoadedSuccesful,
} from '@redux/actions/videos.actions';
import { State, initialState } from '@redux/app.state';

const appReducer = createReducer(
  initialState,
  on(loadVideos, (state): State => ({ ...state, isLoading: true })),
  on(videosLoadedSuccesful, (state, { allVideos, pageInfo, currentPage }) => {
    const apiVideos: Record<string, IYouTubeItem> = {};
    const videosIds = allVideos.map((video) => video.id);
    const page = {
      currentPage,
      pageTokens: {
        nextPageToken: pageInfo.nextPageToken,
        prevPageToken: pageInfo.prevPageToken,
      },
    };

    allVideos.forEach((video) => {
      apiVideos[video.id] = video;
    });
    return { ...state, isLoading: false, allVideos: apiVideos, pageInfo: page, videosIds };
  }),
  on(videoCreated, (state, { video }): State => {
    const customVideos = [...state.customVideos];
    customVideos.push(video);
    return { ...state, customVideos };
  }),
  on(deleteVideo, (state, { videoId }): State => {
    const updatedVideos = [...state.customVideos].splice(videoId, 1);
    return { ...state, ...updatedVideos };
  }),
  on(addToFavorites, (state, { videoId }) => {
    const favoriteVideosIds = [...state.favoriteVideosIds];
    favoriteVideosIds.push(videoId);
    return { ...state, favoriteVideosIds };
  }),
  on(removeFromFavorites, (state, { videoId }) => {
    const favoriteVideosIds = [...state.favoriteVideosIds].filter((id) => id !== videoId);
    return { ...state, favoriteVideosIds };
  }),
);

export const videosReducer: ActionReducer<State, Action> = (state, action) => appReducer(state, action);
