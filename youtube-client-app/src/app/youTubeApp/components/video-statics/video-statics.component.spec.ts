import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VideoStaticsComponent } from './video-statics.component';

describe('VideoStaticsComponent', () => {
  let component: VideoStaticsComponent;
  let fixture: ComponentFixture<VideoStaticsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [VideoStaticsComponent],
    });
    fixture = TestBed.createComponent(VideoStaticsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
