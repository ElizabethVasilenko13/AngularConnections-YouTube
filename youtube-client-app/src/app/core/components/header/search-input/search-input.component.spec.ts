import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { Router } from '@angular/router';
import { provideMockStore } from '@ngrx/store/testing';
import { ButtonComponent } from '@shared/ui/button/button.component';
import { MAIN_PAGE_ROUTE } from '@core/consts';
import { YoutubeService } from '@services/youtubeService.service';
import { SearchInputComponent } from './search-input.component';

describe('SearchInputComponent', () => {
  let component: SearchInputComponent;
  let fixture: ComponentFixture<SearchInputComponent>;
  let router: Router;

  beforeEach(() => {
    const youtubeServiceMock = {
      searchTerm$: { next: jest.fn() },
      getVideos: jest.fn(),
    };

    TestBed.configureTestingModule({
      declarations: [SearchInputComponent],
      imports: [RouterTestingModule, ButtonComponent],
      providers: [
        provideMockStore(),
        { provide: YoutubeService, useValue: youtubeServiceMock },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(SearchInputComponent);
    component = fixture.componentInstance;
    router = TestBed.inject(Router);
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should show filters on toggleFiltersBtn', () => {
    const eshowFiltersSpy = jest.spyOn(component.showFilters, 'emit');
    component.toggleFiltersBtn();
    expect(eshowFiltersSpy).toHaveBeenCalledWith(true);
  });

  it('should navigate to main page on navigateToMain', () => {
    const routerSpy = jest.spyOn(router, 'navigate');
    component.navigateToMain();
    expect(routerSpy).toHaveBeenCalledWith([MAIN_PAGE_ROUTE]);
  });

});