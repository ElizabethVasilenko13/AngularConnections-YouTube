import { createAction, props } from "@ngrx/store";

export const addToFavorites = createAction('[Favorite] Add to Favorites', props<{ videoId: string }>());
export const removeFromFavorites = createAction('[Favorite] Remove from Favorites', props<{ videoId: string }>());