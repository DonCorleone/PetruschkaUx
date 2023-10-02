import { ChangeDetectionStrategy, Component, OnInit, ViewChild } from '@angular/core';
import { NgbCarousel, NgbCarouselConfig } from '@ng-bootstrap/ng-bootstrap';
import { take } from 'rxjs/operators';
import { PressService } from 'src/app/services/press.service';
import { Press } from '../../models/press.models';
import { CommonModule, DatePipe } from '@angular/common';

@Component({
  selector: 'app-press',
  templateUrl: './press.component.html',
  styleUrls: ['./press.component.scss'],
  standalone: true,
  imports: [NgbCarousel, CommonModule],
  providers: [NgbCarouselConfig],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PressComponent implements OnInit {
  @ViewChild('carousel') carousel: NgbCarousel;

  pressArticles: Press[];

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

  ngOnInit(): void {
    this.pressService.pressArticles$.pipe(take(1)).subscribe((result) => {
      this.pressArticles = result;
      result.slice().sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
    });
  }
}
