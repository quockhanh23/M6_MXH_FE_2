import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListImageDefaultComponent } from './list-image-default.component';

describe('ListImageDefaultComponent', () => {
  let component: ListImageDefaultComponent;
  let fixture: ComponentFixture<ListImageDefaultComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListImageDefaultComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListImageDefaultComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
