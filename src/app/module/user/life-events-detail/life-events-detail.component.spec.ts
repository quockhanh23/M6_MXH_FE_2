import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LifeEventsDetailComponent } from './life-events-detail.component';

describe('LifeEventsDetailComponent', () => {
  let component: LifeEventsDetailComponent;
  let fixture: ComponentFixture<LifeEventsDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LifeEventsDetailComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LifeEventsDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
