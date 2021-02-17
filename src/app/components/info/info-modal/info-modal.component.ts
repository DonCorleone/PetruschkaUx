import { Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { EventDetail, EventDetailEventInfo } from 'src/app/models/event.models';
import { EventService } from 'src/app/services/event.service';
import { Apollo, gql } from 'apollo-angular';
import { map } from 'rxjs/operators';

const GET_EVENTINFO_BYEVENTID = gql`
  query GetEventByGroupId($eventId: Int!){
    eventDetail(query:{_id:$eventId}){
      eventInfos{
        name
        languageId
        shortDescription
        longDescription
        address
        location
        bannerImagePath
        artists
      }
      notificationEmail
    }
  }
`;

interface GetEventInfoById {
  eventDetail: EventDetail;
  notificationEmail: String;
}

@Component({
  selector: 'app-info-modal',
  templateUrl: './info-modal.component.html',
  styleUrls: ['./info-modal.component.scss']
})
export class InfoModalComponent implements OnInit {

  @Input() eventDetailId: number;

  eventDetail$: Observable<EventDetail>;
  eventInfo: EventDetailEventInfo;

  constructor(public activeModal: NgbActiveModal, private eventService: EventService, private apollo: Apollo) {}

  ngOnInit() {

    this.eventDetail$ = this.eventService.GetEventInfo(this.eventDetailId);
    this.eventDetail$.subscribe(({eventInfos}) => this.eventInfo = eventInfos.find(l => l.languageId == 1));
  }
}
