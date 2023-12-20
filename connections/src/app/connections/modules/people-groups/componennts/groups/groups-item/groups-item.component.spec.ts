import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GroupsItemComponent } from './groups-item.component';

describe('GroupsItemComponent', () => {
  let component: GroupsItemComponent;
  let fixture: ComponentFixture<GroupsItemComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GroupsItemComponent]
    });
    fixture = TestBed.createComponent(GroupsItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
