import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { map, take, tap } from 'rxjs/operators';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import {EventDetail, EventDetailEventInfo, TicketPrice} from 'src/app/models/event.models';
import { EventService } from 'src/app/services/event.service';

@Component({
  selector: 'app-info-modal',
  templateUrl: './info-modal.component.html',
  styleUrls: ['./info-modal.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InfoModalComponent implements OnInit {
  @Input() eventDetailId: number;
  @Input() usage: string;
	@Input() tag: string;
  @Input() eventDetail$: Observable<EventDetail>;

  eventInfo$: Observable<EventDetailEventInfo>;

  constructor(public activeModal: NgbActiveModal, private eventService: EventService) {}

  ngOnInit() {
    this.eventInfo$ = this.eventDetail$.pipe(
      map((p) => {
        return p.eventInfos?.find((f) => f.languageId === 0);
      })
    );
  }

  GetPreSaleStartFromEventDetail(eventDetail: EventDetail): Date {
    const ticketTypes = EventService.getSortedTicketType(eventDetail);
    return ticketTypes && ticketTypes?.length > 0 ? ticketTypes[0].preSaleStart : null;
  }

	GetPricesStringFromEventDetail(eventDetail: EventDetail): TicketPrice[] {
		return EventService.GetPricesStringFromEventDetail(eventDetail);
	}

  GetEventInfoFromEventDetail(eventDetail: EventDetail): EventDetailEventInfo {
    return eventDetail.eventInfos?.find((p) => p.languageId === 0);
  }

	GetTicketDescFromEventDetail(eventDetail: EventDetail) {
		return EventService.GetTicketTypeInfoFromEventDetail(eventDetail, "Erwachsene");
	}
}
