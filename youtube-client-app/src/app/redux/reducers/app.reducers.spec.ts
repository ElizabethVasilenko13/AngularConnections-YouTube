import { State, initialState } from "@redux/app.state";
import { mockState, mockVideo, videoId } from "@redux/videos.mocks";
import { IYouTubeItem } from "@shared/models/search-item.model";
import * as fromVideos from '../actions/videos.actions';
import { videosReducer } from "./app.reducers";


describe('VideosReducers', () => {
  let initialTestState: State;

  beforeEach(() => {
    initialTestState = { ...initialState };
  });

  it('should change state when load Videos', () => {
      const result = videosReducer(initialTestState, fromVideos.loadVideos({ pageToken: mockState.pageInfo.pageTokens.nextPageToken}));
      const expectedState = { ...initialState, isLoading: true };
      expect(result).toEqual(expectedState);
  });

  it('should change state when load Videos Success', () => {
    const  { pageTokens } = mockState.pageInfo;
    const result = videosReducer(initialTestState, fromVideos.videosLoadedSuccesful({allVideos: mockVideo, pageInfo: pageTokens, currentPage: 1}))
    const apiVideos: Record<string, IYouTubeItem> = {};
    mockVideo.forEach((video) => {
      apiVideos[video.id] = video;
    });

    const expectedState = {
      ...initialState,
      isLoading: false,
      allVideos: apiVideos,
      pageInfo: { currentPage: 1, pageTokens },
      videosIds: mockVideo.map((video) => video.id),
    };

    expect(result).toEqual(expectedState);
  });

  it('should change state when video add to Favorite', () => {
    const result = videosReducer(initialTestState, fromVideos.addToFavorites({ videoId }))
    const expectedState = {
      ...initialState,
      favoriteVideosIds: [...initialState.favoriteVideosIds, videoId],
    };

    expect(result).toEqual(expectedState);
  });

  it('should change state when video remove to Favorite', () => {
    const result = videosReducer(initialTestState, fromVideos.removeFromFavorites({ videoId }))
    const updatedFavorites = [...initialState.favoriteVideosIds].filter((id) => id !== videoId);
    const expectedState = { ...initialState, favoriteVideosIds: updatedFavorites };

    expect(result).toEqual(expectedState);
  });

  it('should change state when custom video Created', () => {
    const customVideo = mockState.customVideos[0];
    const result = videosReducer(initialTestState, fromVideos.videoCreated({ video: customVideo }))

    const expectedState = {
      ...initialState,
      customVideos: [...initialState.customVideos, customVideo],
    };

    expect(result).toEqual(expectedState);
  });

  it('should change state when custom video Deleted', () => {
    const videoIdToDelete = 0;
    const result = videosReducer(initialTestState, fromVideos.deleteVideo({ videoId: videoIdToDelete  }))

    const expectedState = {
      ...initialState,
      customVideos: [],
    };

    expect(result).toEqual(expectedState);
  });
});