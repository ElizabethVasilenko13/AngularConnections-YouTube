import { TestBed } from '@angular/core/testing';
import { provideMockStore, MockStore } from '@ngrx/store/testing';
import { addToFavorites, removeFromFavorites } from '@redux/actions/videos.actions';
import { FavoriteService } from './favorite-service.service';

describe('FavoriteService', () => {
  let service: FavoriteService;
  let store: MockStore;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        FavoriteService,
        provideMockStore(),
      ],
    });
    service = TestBed.inject(FavoriteService);
    store = TestBed.inject(MockStore);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should dispatch addToFavorites action', () => {
    const spyDispatch = jest.spyOn(store, 'dispatch');
    const videoId = '123';
    service.addToFavorites(videoId);

    expect(spyDispatch).toHaveBeenCalledWith(addToFavorites({ videoId }));
  });

  it('should dispatch removeFromFavorites action', () => {
    const spyDispatch = jest.spyOn(store, 'dispatch');
    const videoId = '456';

    service.removeFromFavorites(videoId);

    expect(spyDispatch).toHaveBeenCalledWith(removeFromFavorites({ videoId }));
  });
});