import { mockState } from '@redux/videos.mocks';
import * as fromVideos from './videos.actions';

describe('Videos Actions', () => {
  it('should create an action to load videos', () => {
    const pageToken = mockState.pageInfo.pageTokens.nextPageToken;
    const page = mockState.pageInfo.currentPage;
    const expectedAction = {
        type: fromVideos.loadVideos.type,
        pageToken,
        currentPage: page

    };
    const action = fromVideos.loadVideos({ currentPage: page, pageToken: mockState.pageInfo.pageTokens.nextPageToken});
    expect(action).toEqual(expectedAction);
  });

  it('should create an action to open video', () => {
    const expectedAction = {
        type: fromVideos.openVideo.type,
        videoId: 'id'
    };
    const action = fromVideos.openVideo({  videoId: 'id' });
    expect(action).toEqual(expectedAction);
  });

  it('should create an action to create video', () => {
    const video = mockState.customVideos[0]
    const expectedAction = {
        type: fromVideos.videoCreated.type,
        video
    };
    const action = fromVideos.videoCreated({ video });
    expect(action).toEqual(expectedAction);
  });

  it('should create an action to add video to favorite', () => {
    const videoId = mockState.videosIds[0]
    const expectedAction = {
        type: fromVideos.addToFavorites.type,
        videoId
    };
    const action = fromVideos.addToFavorites({ videoId });
    expect(action).toEqual(expectedAction);
  });

});