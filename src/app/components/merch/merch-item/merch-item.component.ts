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

	@Input() eventDetail: EventDetail;
	@Input() usage: string;

	ticketTypeInfo: TicketTypeInfo;

	constructor(private modalService: NgbModal) {
	}

	get name(): string {
		return (this.eventDetail && this.eventDetail.eventInfos[0]) ? this.eventDetail.eventInfos[0].name : null;
	}

	get imagePath(): string {
		return "https://images.weserv.nl/?url=" + this.ticketTypeInfo?.imageUrl + "&w=900&h=900";
	}

	get description(): string {
		return this.ticketTypeInfo?.description;
	}

	ngOnInit(): void {
		this.ticketTypeInfo = EventService.GetTicketTypeInfoFromEventDetail(this.eventDetail, 'Tournee');
	}

	openDetail(): void {
		const modalRef = this.modalService.open(MerchModalComponent);
		modalRef.componentInstance.eventDetail = this.eventDetail;
	}
}
