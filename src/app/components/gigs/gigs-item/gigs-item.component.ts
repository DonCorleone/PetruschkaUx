import {Component, Input, OnInit} from '@angular/core';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {EventDetailEventInfo, TicketType} from 'src/app/models/event.models';
import { EventService } from 'src/app/services/event.service';
import {InfoModalComponent} from '../../info/info-modal/info-modal.component';
import {LocationModalComponent} from '../../location/location-modal/location-modal.component';

@Component({
	selector: 'app-gigs-item',
	templateUrl: './gigs-item.component.html',
	styleUrls: ['./gigs-item.component.scss']
})
export class GigsItemComponent implements OnInit {

	public isCollapsed = true;
	@Input() start: Date;
	@Input() eventId: number;
	@Input() eventInfoDe: EventDetailEventInfo;
	@Input() priceString: string;

	constructor(private modalService: NgbModal) {
	}

	get eventLink() {
		return this.eventInfoDe ? 'https://www.ticketino.com/de/Event/' + this.eventInfoDe.name + '/' + this.eventId : '';
	}

	get showBuyButton(): boolean {
		return (new Date(this.start) > new Date());
	}

	ngOnInit(): void {
	}

	openInfo(): void {
		const modalRef = this.modalService.open(InfoModalComponent);
		modalRef.componentInstance.eventDetailId = this.eventId;
		modalRef.componentInstance.usage = ''; // else case
		modalRef.componentInstance.playDate = this.start; // else case
	}

	openLocation(locationName: string): void {
		const modalRef = this.modalService.open(LocationModalComponent);
		modalRef.componentInstance.eventLocationName = locationName;
	}
}
