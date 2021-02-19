import { Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { EventDetail, EventDetailEventInfo } from 'src/app/models/event.models';
import { EventService } from 'src/app/services/event.service';

@Component({
  selector: 'app-info-modal',
  templateUrl: './info-modal.component.html',
  styleUrls: ['./info-modal.component.scss']
})
export class InfoModalComponent implements OnInit {

  @Input() eventDetailId: number;
  @Input() usage: string;
  @Input() playDate: Date;

  eventDetail$: Observable<EventDetail>;
  eventInfo: EventDetailEventInfo;

  constructor(public activeModal: NgbActiveModal, private eventService: EventService) {}

  ngOnInit() {

    this.eventDetail$ = this.eventService.GetEventInfo(this.eventDetailId);
    this.eventDetail$.subscribe(({eventInfos}) => this.eventInfo = eventInfos.find(l => l.languageId == 1));
  }
}
