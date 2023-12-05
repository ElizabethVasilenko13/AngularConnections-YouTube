import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { provideMockStore } from '@ngrx/store/testing';
import { Action } from '@ngrx/store';
import { mockState, mockVideo } from '@redux/videos.mocks';
import { initialState } from '@redux/app.state';
import { ReplaySubject } from 'rxjs';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { loadVideos, videosLoadedSuccesful } from '@redux/actions/videos.actions';
import { YoutubeService } from '@services/youtubeService.service';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { YouTubeApiEffects } from './youtube-api.effects';


describe('YouTubeApiEffects', () => {
  let effect: YouTubeApiEffects;
  let actions$: ReplaySubject<Action>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        YouTubeApiEffects,
        YoutubeService,
        provideMockActions(() => actions$),
        provideMockStore({ initialState }),
      ],
      schemas: [NO_ERRORS_SCHEMA],
    });
    effect = TestBed.inject(YouTubeApiEffects);
    actions$ = new ReplaySubject();
  });

  it('should be created', () => {
    expect(effect).toBeTruthy();
  });

  it('should dispatch videosLoadedSuccesful action with correct payload', () => {
    const pageToken = mockState.pageInfo.pageTokens.nextPageToken;
    const { currentPage } = mockState.pageInfo;

    actions$.next(loadVideos({ pageToken, currentPage }));

    effect.loadVideos$.subscribe((result) => {
      expect(result).toEqual(videosLoadedSuccesful({
        allVideos: mockVideo,
        pageInfo: mockState.pageInfo.pageTokens,
        currentPage,
      }));
    });
  });
});