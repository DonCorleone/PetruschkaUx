import { Component, Input, OnInit } from '@angular/core';
import { EventDetail } from 'src/app/models/event.models';
import { EventService } from 'src/app/services/event.service';

@Component({
  selector: 'app-gigs-item',
  templateUrl: './gigs-item.component.html',
  styleUrls: ['./gigs-item.component.scss']
})
export class GigsItemComponent implements OnInit {

  public isCollapsed = true;
  @Input() eventDetail: EventDetail;

  get location():string {
    return EventService.GetLocationFromEventDetail(this.eventDetail);
  }

  get name():string {
    return EventService.GetNameFromEventDetail(this.eventDetail);
  }

  get longDescription():string {
    return EventService.GetLongDescriptionFromEventDetail(this.eventDetail);
  }

  get start():Date {
    return EventService.GetStartFromEventDetail(this.eventDetail);
  }

  constructor() { }

  ngOnInit(): void {
  }
}
