import { Component, ViewChild } from '@angular/core';
import { NgbCarousel, NgbCarouselConfig } from '@ng-bootstrap/ng-bootstrap';
import { map } from 'rxjs/operators';
import { Press, PressService } from 'src/app/services/press.service';

@Component({
  selector: 'app-press',
  templateUrl: './press.component.html',
  styleUrls: ['./press.component.scss'],
  providers: [NgbCarouselConfig],
})
export class PressComponent {
  @ViewChild('carousel') carousel: NgbCarousel;

  pressArticles$ = this.pressService.pressArticles$.pipe(
    map((result) => result.slice().sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()))
  );

  todayDate = new Date();

  getDate(article: Press): Date {
    if (article !== undefined && article.date !== undefined) {
      let newDate = new Date(article.date);
      if (newDate !== undefined) {
        return newDate;
      } else {
        return this.todayDate;
      }
    }
  }
  constructor(private pressService: PressService, config: NgbCarouselConfig) {
    config.showNavigationArrows = false;
    config.showNavigationIndicators = true;
    config.pauseOnFocus = true;
    config.pauseOnHover = true;
  }

  arrowLeft(): void {
    this.carousel.pause();
    this.carousel.prev();
  }
  arrowRight(): void {
    this.carousel.pause();
    this.carousel.next();
  }
}
