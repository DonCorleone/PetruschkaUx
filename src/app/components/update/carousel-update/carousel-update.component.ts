import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { NgbCarouselConfig } from '@ng-bootstrap/ng-bootstrap';
import { EventDetail } from 'src/app/models/event.models';
import { EventService } from 'src/app/services/event.service';

@Component({
  selector: 'app-carousel-update',
  templateUrl: './carousel-update.component.html',
  styleUrls: ['./carousel-update.component.scss']
})
export class CarouselUpdateComponent  implements OnInit {
  images = [];

  eventDetails$: Observable<EventDetail[]>;

  loading: boolean;

  constructor(private eventService: EventService, config: NgbCarouselConfig) {

    // customize default values of carousels used by this component tree
    config.interval = 7500;
    config.keyboard = false;
    config.pauseOnHover = false;
    config.showNavigationIndicators = false;
    config.animation = false;
  }

  ngOnInit() {
    this.eventDetails$ = this.eventService.GetEventDetails(p=>p.googleAnalyticsTracker == "Premiere");
  }
}
