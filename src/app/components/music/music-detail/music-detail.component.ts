import {Component, Input, OnInit} from '@angular/core';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {EventDetail, EventDetailEventInfo, TicketTypeInfo} from 'src/app/models/event.models';
import {EventService} from 'src/app/services/event.service';
import {InfoModalComponent} from '../../info/info-modal/info-modal.component';
import {AboutModalComponent} from '../../about/about-modal/about-modal.component';

@Component({
	selector: 'app-music-detail',
	templateUrl: './music-detail.component.html',
	styleUrls: ['./music-detail.component.scss']
})
export class MusicDetailComponent implements OnInit {

	@Input() eventDetail: EventDetail;

	ticketTypeInfo: TicketTypeInfo;
	eventInfo: EventDetailEventInfo;

	constructor(private modalService: NgbModal) {
	}

	get eventName(): string {
		return this.eventInfo?.name;
	}

	get reservationMail(): string {
		return (this.eventDetail && this.eventDetail.notificationEmail) ? this.eventDetail.notificationEmail : null;
	}

	get imagePath(): string {
		return this.ticketTypeInfo?.imageUrl;
	}

	get shortDesc(): string {
		return this.eventInfo?.shortDescription;
	}

	get cdDesc(): string {
		return this.ticketTypeInfo?.description;
	}

	ngOnInit(): void {
		this.ticketTypeInfo = EventService.GetTicketTypeInfoFromEventDetail(this.eventDetail, 'CD');
		this.eventInfo = EventService.GetEventInfoFromEventDetail(this.eventDetail);
	}

	openInfo(): void {
		const modalRef = this.modalService.open(InfoModalComponent);
		modalRef.componentInstance.eventDetailId = this.eventDetail._id;
		modalRef.componentInstance.usage = 'Tournee'; // else case
		modalRef.componentInstance.playDate = this.eventDetail.start;
	}

	openStaff(staffName: string) {
		const modalRef = this.modalService.open(AboutModalComponent);
		modalRef.componentInstance.staffName = staffName;
	}
}
