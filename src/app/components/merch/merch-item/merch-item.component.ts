import {Component, Input, OnInit} from '@angular/core';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {EventDetail, TicketTypeInfo} from 'src/app/models/event.models';
import {EventService} from 'src/app/services/event.service';
import {MerchModalComponent} from '../merch-modal/merch-modal.component';

@Component({
	selector: 'app-merch-item',
	templateUrl: './merch-item.component.html',
	styleUrls: ['./merch-item.component.scss']
})
export class MerchItemComponent implements OnInit {

	@Input() eventDetailId: number;
	@Input() imageUrl: string;
	@Input() name: string;
	@Input() usage: string;

	ticketTypeInfo: TicketTypeInfo;

	constructor(private modalService: NgbModal) {
	}

	get imagePath(): string {
		return "https://images.weserv.nl/?url=" + this.imageUrl + "&w=899&h=899";
	}

	get description(): string {
		return this.ticketTypeInfo?.description;
	}

	ngOnInit(): void {
	}

	openDetail(): void {
		const modalRef = this.modalService.open(MerchModalComponent, { size:'lg' });
		modalRef.componentInstance.eventDetailId = this.eventDetailId;
	}
}
