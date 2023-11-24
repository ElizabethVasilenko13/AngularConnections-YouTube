import { createReducer, on } from '@ngrx/store';
import { AppState, initialState } from '../app.state';
import { loadVideos, videosLoaded } from '../actions/youtube-api.actions';

export const youTubeApiReducers = createReducer<AppState>(
  initialState,
  on(
    videosLoaded,
    (state, action): AppState => ({
      ...state,
      apiVideos: [...action.apiVideos],
    }),
  ),
  on(loadVideos, (state): AppState => state),
);
