import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailVideoItemComponent } from './detail-video-item.component';

describe('DetailVideoItemComponent', () => {
  let component: DetailVideoItemComponent;
  let fixture: ComponentFixture<DetailVideoItemComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DetailVideoItemComponent]
    });
    fixture = TestBed.createComponent(DetailVideoItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
