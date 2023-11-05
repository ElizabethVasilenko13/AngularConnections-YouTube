import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailInfoPageComponent } from './detail-info-page.component';

describe('DetailInfoPageComponent', () => {
  let component: DetailInfoPageComponent;
  let fixture: ComponentFixture<DetailInfoPageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DetailInfoPageComponent]
    });
    fixture = TestBed.createComponent(DetailInfoPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
