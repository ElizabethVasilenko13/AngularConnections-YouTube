import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideMockStore, MockStore } from '@ngrx/store/testing';
import { of } from 'rxjs';
import { loadVideos } from '@redux/actions/videos.actions';
import { SortingService } from '@core/services/sorting.service';
import { SearchService } from '@services/searchService.service';
import { SortBy } from '@youtube/pipes/sort-by.pipe';
import { TitleFilterPipe } from '@shared/pipes/title-filter.pipe';
import { SearchResultComponent } from './search-result.component';

describe('SearchResultComponent', () => {
  let component: SearchResultComponent;
  let fixture: ComponentFixture<SearchResultComponent>;
  let store: MockStore;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SearchResultComponent, SortBy, TitleFilterPipe],
      providers: [
        SortingService,
        SearchService,
        provideMockStore({
          initialState: {
            videos: {
              videosList: [],
              customVideos: [],
              pageInfo: null,
              videoLoading: false,
              currentpageNum: null,
            },
          },
        }),
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(SearchResultComponent);
    component = fixture.componentInstance;
    store = TestBed.inject(MockStore);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should dispatch loadVideos action when loadNextPage is called', () => {
    const storeSpy = jest.spyOn(store, 'dispatch');
    const mockPageInfo = {
      pageTokens: { nextPageToken: 'nextToken', prevPageToken: 'prevToken' },
      currentPage: 1,
    };
    component.pageInfo$ = of(mockPageInfo);

    component.loadNextPage();

    expect(storeSpy).toHaveBeenCalledWith(
      loadVideos({ pageToken: 'nextToken', currentPage: 2 })
    );
  });

  it('should dispatch loadVideos action when loadPrevPage is called', () => {
    const storeSpy = jest.spyOn(store, 'dispatch');
    const mockPageInfo = {
      pageTokens: { nextPageToken: 'nextToken', prevPageToken: 'prevToken' },
      currentPage: 2,
    };
    component.pageInfo$ = of(mockPageInfo);
    component.loadPrevPage();
    expect(storeSpy).toHaveBeenCalledWith(
      loadVideos({ pageToken: 'prevToken', currentPage: 1 })
    );
  });

  it('should not display loader and display videoList when videoloading$ = false', () => {
    component.videoloading$ = of(false);
    fixture.detectChanges();

    const searchResultElement = fixture.nativeElement.querySelector('.search-results');
    const loaderElement = fixture.nativeElement.querySelector('.loader');
    expect(loaderElement).toBeNull();
    expect(searchResultElement).toBeTruthy();
  });

  it('should display loader and not display videoList when videoloading$ = true', () => {
    component.videoloading$ = of(true);
    fixture.detectChanges();
    const searchResultElement = fixture.nativeElement.querySelector('.search-results');

    const loaderElement = fixture.nativeElement.querySelector('.loader');
    expect(loaderElement).toBeTruthy();
    expect(searchResultElement).toBeNull();
  });
});