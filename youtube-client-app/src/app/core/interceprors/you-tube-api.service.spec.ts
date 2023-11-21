import { TestBed } from '@angular/core/testing';

import { YouTubeApiService } from './you-tube-api.service';

describe('YouTubeApiService', () => {
  let service: YouTubeApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(YouTubeApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
