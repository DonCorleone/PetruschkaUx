import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { EventDetail } from 'src/app/models/event.models';
import { EventService } from 'src/app/services/event.service';

@Component({
  selector: 'app-music',
  templateUrl: './music.component.html',
  styleUrls: ['./music.component.scss']
})
export class MusicComponent implements OnInit {

  eventDetailsCD$: Observable<EventDetail[]>;

  constructor(private eventService: EventService) { }

  ngOnInit() {
    this.eventDetailsCD$ = this.eventService.GetEventDetails(p=>p.facebookPixelId == "CD");
  }

}
