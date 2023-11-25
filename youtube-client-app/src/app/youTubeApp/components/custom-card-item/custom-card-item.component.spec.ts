import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomCardItemComponent } from './custom-card-item.component';

describe('CustomCardItemComponent', () => {
  let component: CustomCardItemComponent;
  let fixture: ComponentFixture<CustomCardItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CustomCardItemComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CustomCardItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
