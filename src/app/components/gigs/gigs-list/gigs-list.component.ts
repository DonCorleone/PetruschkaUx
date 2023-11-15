import { ChangeDetectionStrategy, Component } from '@angular/core';
import { EventDetail, EventDetailEventInfo, TicketPrice } from 'src/app/models/event.models';
import { EventService } from 'src/app/services/event.service';
import { LoadingIndicatorComponent } from '../../loading-indicator/loading-indicator.component';
import { GigsItemComponent } from '../gigs-item/gigs-item.component';
import { CommonModule } from '@angular/common';
import { slideInRightOnEnterAnimation } from 'angular-animations';

@Component({
  selector: 'app-gigs-list',
  templateUrl: './gigs-list.component.html',
  styleUrls: ['./gigs-list.component.scss'],
  standalone: true,
  imports: [GigsItemComponent, LoadingIndicatorComponent, CommonModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [slideInRightOnEnterAnimation({ duration: 1000 })],
})
export class GigsListComponent {
  public animatePage = true;

  eventDetailsUpcoming$ = this.eventService.upcomingGigs$;

  constructor(private eventService: EventService) {}

  GetEventInfoFromEventDetail(eventDetail: EventDetail): EventDetailEventInfo {
    return eventDetail.eventInfos?.find((p) => p.languageId === 0);
  }

  GetPricesStringFromEventDetail(eventDetail: EventDetail): TicketPrice[] {
    return EventService.GetPricesStringFromEventDetail(eventDetail);
  }

  GetPreSaleStartFromEventDetail(eventDetail: EventDetail): Date {
    const ticketTypes = EventService.getSortedTicketType(eventDetail);
    return ticketTypes && ticketTypes?.length > 0 ? ticketTypes[0].preSaleStart : null;
  }
}
