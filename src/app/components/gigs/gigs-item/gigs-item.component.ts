import {ChangeDetectionStrategy, Component, Input, OnInit} from '@angular/core';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {EventDetail, EventDetailEventInfo, TicketPrice, TicketType} from 'src/app/models/event.models';
import { EventService } from 'src/app/services/event.service';
import {InfoModalComponent} from '../../info/info-modal/info-modal.component';
import {LocationModalComponent} from '../../location/location-modal/location-modal.component';
import { TicketModalComponent } from '../../ticket/ticket-modal/ticket-modal.component';

@Component({
	selector: 'app-gigs-item',
	templateUrl: './gigs-item.component.html',
	styleUrls: ['./gigs-item.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class GigsItemComponent implements OnInit {

	public isCollapsed = true;
	@Input() start: Date;
	@Input() tag: string;
	@Input() preSaleStart: Date;
	@Input() eventId: number;
	@Input() eventInfoDe: EventDetailEventInfo;
	@Input() ticketPrices: TicketPrice[];
	@Input() eventKey: string;

	constructor(private modalService: NgbModal, private eventService: EventService) {
	}

	get eventLink() {

		if (this.eventInfoDe?.url?.includes('petruschka.ch')){
			return 'modal';
		}else if (this.eventInfoDe?.url?.includes('ticketino.com')){
			return this.eventInfoDe ? 'https://www.ticketino.com/de/Event/' + this.eventInfoDe.name + '/' + this.eventId : '';
		}else{
			return this.eventInfoDe?.url;
		}
	}

	get showBuyButton(): boolean {
		return (new Date(this.preSaleStart) <= new Date() && new Date(this.start) >= new Date());
	}

	get showIsGone(): boolean {
		return new Date(this.start) < new Date();
	}

	get preSaleInFuture(): boolean {
		return new Date(this.preSaleStart) > new Date()
			&& new Date(this.start).getHours() !== 0;
	}

	get preSaleInSuperFuture(): boolean {
		return new Date(this.preSaleStart) > new Date()
		&& new Date(this.start).getHours() === 0 ;
	}

	ngOnInit(): void {
	}


	openTicket(): void {
		if (this.tag === 'sold-out'){
			return;
		}
		var eventLink = this.eventLink;
		if (eventLink == 'modal') {
			const modalRef = this.modalService.open(TicketModalComponent, { size:'md' });
		}else {
			window.open(eventLink, "_blank");
		}
	}

	openInfo(): void {
		const modalRef = this.modalService.open(InfoModalComponent, { size:'lg' });
		modalRef.componentInstance.eventDetailId = this.eventId;
		modalRef.componentInstance.usage = '';
		modalRef.componentInstance.tag = this.tag;
		modalRef.componentInstance.eventDetail$ = this.eventService.GetEventDetail(this.eventId);
	}

	openLocation(locationName: string): void {
		const modalRef = this.modalService.open(LocationModalComponent, { size:'lg' });
		modalRef.componentInstance.eventLocationName = locationName;
	}
}
