import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CarouselPromoComponent } from './carousel-promo.component';

describe('CarouselPromoComponent', () => {
  let component: CarouselPromoComponent;
  let fixture: ComponentFixture<CarouselPromoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CarouselPromoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CarouselPromoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
