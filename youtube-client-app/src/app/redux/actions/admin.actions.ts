import { createAction, props } from '@ngrx/store';
import { IYouTubeCustomItem } from '@shared/models/search-item.model';

export const videoCreated = createAction('[Admin] Video Created', props<{ video: IYouTubeCustomItem }>());
export const deleteVideo = createAction('[Admin] Delete Custom Video', props<{ videoId: number }>());