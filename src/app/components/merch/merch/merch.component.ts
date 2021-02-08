import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { EventDetail } from 'src/app/models/event.models';
import { EventService } from 'src/app/services/event.service';

@Component({
  selector: 'app-merch',
  templateUrl: './merch.component.html',
  styleUrls: ['./merch.component.scss']
})
export class MerchComponent implements OnInit {

  eventDetailsTournee$: Observable<EventDetail[]>;

  constructor(private eventService: EventService) { }

  ngOnInit() {
    this.eventDetailsTournee$ = this.eventService.GetEventDetails(p=>p.googleAnalyticsTracker == "Tournee");
  }

}
