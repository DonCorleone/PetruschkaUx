import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GigsItemComponent } from './gigs-item.component';

describe('GigsItemComponent', () => {
  let component: GigsItemComponent;
  let fixture: ComponentFixture<GigsItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GigsItemComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GigsItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
