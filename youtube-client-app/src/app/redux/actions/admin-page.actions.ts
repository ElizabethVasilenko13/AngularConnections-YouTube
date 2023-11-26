import { createAction, props } from '@ngrx/store';
import { IYouTubeCustomItem } from '@shared/models/search-item.model';

export const videoCreated = createAction('[Admin Page] Video Created', props<{ video: IYouTubeCustomItem }>());

export const deleteVideo = createAction('[Video] Delete Custom Video', props<{ videoId: number }>());
