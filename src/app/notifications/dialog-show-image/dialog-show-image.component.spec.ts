import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogShowImageComponent } from './dialog-show-image.component';

describe('DialogShowImageComponent', () => {
  let component: DialogShowImageComponent;
  let fixture: ComponentFixture<DialogShowImageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogShowImageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogShowImageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
