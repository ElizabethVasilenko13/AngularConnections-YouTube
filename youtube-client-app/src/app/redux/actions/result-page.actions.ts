import { createAction, props } from '@ngrx/store';

export const openVideo = createAction('[Result Page] Open Video', props<{ videoId: string }>());
