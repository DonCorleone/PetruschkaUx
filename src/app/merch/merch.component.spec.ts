import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { MerchComponent } from './merch.component';

describe('MerchComponent', () => {
  let component: MerchComponent;
  let fixture: ComponentFixture<MerchComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ MerchComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MerchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
