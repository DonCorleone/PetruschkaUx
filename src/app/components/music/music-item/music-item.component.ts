import {Component, Input, OnInit} from '@angular/core';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {EventDetail, TicketTypeInfo} from 'src/app/models/event.models';
import {EventService} from 'src/app/services/event.service';
import {MusicModalComponent} from '../music-modal/music-modal.component';

@Component({
	selector: 'app-music-item',
	templateUrl: './music-item.component.html',
	styleUrls: ['./music-item.component.scss']
})
export class MusicItemComponent implements OnInit {

	@Input() eventDetail: EventDetail;
	@Input() usage: string;

	ticketTypeInfo: TicketTypeInfo;

	constructor(private modalService: NgbModal) {
	}

	get comingSoon(): boolean {
		return (this.eventDetail && this.eventDetail.start && this.eventDetail.start > new Date());
	}

	get name(): string {
		return (this.eventDetail && this.eventDetail.eventInfos[0]) ? this.eventDetail.eventInfos[0].name : null;
	}

	get imagePath(): string {
		return "https://images.weserv.nl/?url=" + this.ticketTypeInfo?.imageUrl + "&w=899&h=899";
	}

	get description(): string {
		return this.ticketTypeInfo?.description;
	}

	ngOnInit(): void {
		this.ticketTypeInfo = EventService.GetTicketTypeInfoFromEventDetail(this.eventDetail, 'CD');
	}

	openDetail(): void {
		const modalRef = this.modalService.open(MusicModalComponent, { size:'lg' });
		modalRef.componentInstance.eventDetail = this.eventDetail;
	}
}
