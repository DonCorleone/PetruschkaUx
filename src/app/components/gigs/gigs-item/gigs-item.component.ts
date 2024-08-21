import { ChangeDetectionStrategy, Component, Inject, Input, OnInit, PLATFORM_ID } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { EventDetailEventInfo, TicketPrice } from 'src/app/models/event.models';
import { EventService } from 'src/app/services/event.service';
import { InfoModalComponent } from '../../info/info-modal/info-modal.component';
import { LocationModalComponent } from '../../location/location-modal/location-modal.component';
import { TicketModalComponent } from '../../ticket/ticket-modal/ticket-modal.component';
import { LocationIdName } from '../../../models/location.models';
import { CommonModule, CurrencyPipe, isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-gigs-item',
  templateUrl: './gigs-item.component.html',
  styleUrls: ['./gigs-item.component.scss'],
  standalone: true,
  imports: [CommonModule, CurrencyPipe],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GigsItemComponent implements OnInit {
  public isCollapsed = true;
  @Input() start: Date;
  @Input() tag: string;
  @Input() saleState: string;
  @Input() preSaleStart: Date;
  @Input() eventId: number;
  @Input() eventInfoDe: EventDetailEventInfo;
  @Input() ticketPrices: TicketPrice[];
  @Input() eventKey: string;
  @Input() ef_locationId?: number;

  ticketPricesTicket: TicketPrice[];

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

	get showYear(): boolean {
		return new Date(this.start).getFullYear() !== new Date().getFullYear();
	}

	get buyButtonText(): string {
		if (this.saleState === '0') {
			return 'Ausverkauft';
		} else if (this.saleState === 'cancelled') {
			return 'Abgesagt';
		} else {
			if (this.eventLink === 'modal') {
				return 'Reservation';
			}else{
				return 'Tickets';
			}
		}
	}

  openTicket(): void {
    if (this.saleState === '0') {
      return;
    }
    this.eventLink;
    if (this.eventLink == 'modal') {
      const modalRef = this.modalService.open(TicketModalComponent, { size: 'md' });
      modalRef.componentInstance.ticketPrices = this.ticketPrices;
    } else {
      if (isPlatformBrowser(this.platformId)) {
        window.open(this.eventLink, '_blank');
      } else {
        // server specific logic
      }
    }
  }

  openInfo(): void {
    const modalRef = this.modalService.open(InfoModalComponent, { size: 'lg' });
    modalRef.componentInstance.eventDetailId = this.eventId;
    modalRef.componentInstance.usage = '';
    modalRef.componentInstance.saleState = this.saleState;
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

  ngOnInit(): void {
    this.ticketPricesTicket = this.ticketPrices.filter((x) => x.name !== 'CD');
  }
}
