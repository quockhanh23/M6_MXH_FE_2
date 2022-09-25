import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FriendNearbyComponent } from './friend-nearby.component';

describe('FriendNearbyComponent', () => {
  let component: FriendNearbyComponent;
  let fixture: ComponentFixture<FriendNearbyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FriendNearbyComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FriendNearbyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
