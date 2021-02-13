import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { EventDetail, EventDetailEventInfo } from 'src/app/models/event.models';
import { EventService } from 'src/app/services/event.service';

@Component({
  selector: 'app-gigs',
  templateUrl: './gigs.component.html',
  styleUrls: ['./gigs.component.scss']
})
export class GigsComponent implements OnInit {

  eventDetailsUpcoming$: Observable<EventDetail[]>;

  constructor(private eventService: EventService) { }

  ngOnInit() {
    this.eventDetailsUpcoming$ = this.eventService.GetUpcomingEventDetails(new Date());
  }

  GetEventInfoFromEventDetail(eventDetail: EventDetail): EventDetailEventInfo {
    return eventDetail.eventInfos.find( p => p.languageId == 1);
  }
}
