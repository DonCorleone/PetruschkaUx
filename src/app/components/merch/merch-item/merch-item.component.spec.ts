import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MerchItemComponent } from './merch-item.component';

describe('MerchItemComponent', () => {
  let component: MerchItemComponent;
  let fixture: ComponentFixture<MerchItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MerchItemComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MerchItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
