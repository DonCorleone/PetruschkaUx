import { ChangeDetectionStrategy, Component, Inject, Input, PLATFORM_ID } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { EventDetailEventInfo, TicketPrice } from 'src/app/models/event.models';
import { EventService } from 'src/app/services/event.service';
import { InfoModalComponent } from '../../info/info-modal/info-modal.component';
import { LocationModalComponent } from '../../location/location-modal/location-modal.component';
import { TicketModalComponent } from '../../ticket/ticket-modal/ticket-modal.component';
import { LocationIdName } from '../../../models/location.models';
import { platform } from 'os';
import { CommonModule, CurrencyPipe, DatePipe, NgClass, isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-gigs-item',
  templateUrl: './gigs-item.component.html',
  styleUrls: ['./gigs-item.component.scss'],
  standalone: true,
  imports: [CommonModule, NgClass, DatePipe, CurrencyPipe],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GigsItemComponent {
  public isCollapsed = true;
  @Input() start: Date;
  @Input() tag: string;
  @Input() preSaleStart: Date;
  @Input() eventId: number;
  @Input() eventInfoDe: EventDetailEventInfo;
  @Input() ticketPrices: TicketPrice[];
  @Input() eventKey: string;
  @Input() ef_locationId?: number;

  constructor(
    private modalService: NgbModal,
    private eventService: EventService,
    @Inject(PLATFORM_ID) private platformId: any
  ) {}

  get eventLink() {
    if (this.eventInfoDe?.url?.includes('petruschka.ch')) {
      return 'modal';
    } else if (this.eventInfoDe?.url?.includes('ticketino.com')) {
      return this.eventInfoDe ? this.eventInfoDe?.url + this.eventId : '';
    } else {
      return this.eventInfoDe?.url;
    }
  }

  get showBuyButton(): boolean {
    return new Date(this.preSaleStart) <= new Date() && new Date(this.start) >= new Date();
  }

  get showIsGone(): boolean {
    return new Date(this.start) < new Date();
  }

  get preSaleInFuture(): boolean {
    return new Date(this.preSaleStart) > new Date() && new Date(this.start).getHours() !== 0;
  }

  get preSaleInSuperFuture(): boolean {
    return new Date(this.preSaleStart) > new Date() && new Date(this.start).getHours() === 0;
  }

  openTicket(): void {
    if (this.tag === 'sold-out') {
      return;
    }
    const eventLink = this.eventLink;
    if (eventLink == 'modal') {
      const modalRef = this.modalService.open(TicketModalComponent, { size: 'md' });
      modalRef.componentInstance.ticketPrices = this.ticketPrices;
    } else {
      if (isPlatformBrowser(this.platformId)) {
        window.open(eventLink, '_blank');
      } else {
        // server specific logic
      }
    }
  }

  openInfo(): void {
    const modalRef = this.modalService.open(InfoModalComponent, { size: 'lg' });
    modalRef.componentInstance.eventDetailId = this.eventId;
    modalRef.componentInstance.usage = '';
    modalRef.componentInstance.tag = this.tag;
    modalRef.componentInstance.eventDetail$ = this.eventService.GetEventDetail(this.eventId);
  }

  get locationIdName(): LocationIdName {
    return {
      ef_id: this.ef_locationId,
      name: this.eventInfoDe.location,
    };
  }

  openLocation(): void {
    const modalRef = this.modalService.open(LocationModalComponent, { size: 'lg' });
    modalRef.componentInstance.eventLocationIdName = this.locationIdName;
  }
}
