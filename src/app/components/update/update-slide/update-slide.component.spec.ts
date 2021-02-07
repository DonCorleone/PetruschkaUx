import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateSlideComponent } from './update-slide.component';

describe('UpdateSlideComponent', () => {
  let component: UpdateSlideComponent;
  let fixture: ComponentFixture<UpdateSlideComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdateSlideComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateSlideComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
