import {Component, Input, OnInit} from '@angular/core';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {EventDetail, EventDetailEventInfo, TicketTypeInfo} from 'src/app/models/event.models';
import {EventService} from 'src/app/services/event.service';
import {InfoModalComponent} from '../../info/info-modal/info-modal.component';
import {AboutModalComponent} from '../../about/about-modal/about-modal.component';
import {Job} from '../../../models/staff.models';
import {StaffService} from '../../../services/staff.service';

@Component({
	selector: 'app-music-detail',
	templateUrl: './music-detail.component.html',
	styleUrls: ['./music-detail.component.scss']
})
export class MusicDetailComponent implements OnInit {

	@Input() eventDetailId: number;
	private eventDetailProp: EventDetail;
	private ticketTypeInfoProp: TicketTypeInfo;

	set eventDetail(value: EventDetail){
		this.eventDetailProp = value;
		this.ticketTypeInfo = EventService.GetTicketTypeInfoFromEventDetail(value, 'CD');
	}

	get eventDetail(): EventDetail{
		return this.eventDetailProp;
	}

	set ticketTypeInfo(value: TicketTypeInfo) {
		this.ticketTypeInfoProp = value;
		if (value) {
			this.artistsArray = this.staffService.GetStaffLinks(this.ticketTypeInfo.description);
		}
	}

	get ticketTypeInfo(): TicketTypeInfo {
		return this.ticketTypeInfoProp;
	}

	artistsArray: Job[];

	constructor(private modalService: NgbModal, private staffService: StaffService, private eventService: EventService) {
	}

	get artists(): Job[] {
		return (this.artistsArray && this.artistsArray.length > 0) ? this.artistsArray : null;
	}

	get eventName(): string {
		return (this.eventDetail && this.eventDetail.eventInfos.filter(
			p => p.languageId === 1))?.length > 0 ? this.eventDetail.eventInfos.filter(
				p => p.languageId === 1)[0].name : null;
	}

	get reservationMail(): string {
		return (this.eventDetail && this.eventDetail.notificationEmail) ? this.eventDetail.notificationEmail : null;
	}

	get imagePath(): string {
		return "https://images.weserv.nl/?url=" + this.ticketTypeInfo?.imageUrl + "&w=899&h=899";
	}

	get shortDesc(): string {
		return (this.eventDetail && this.eventDetail.eventInfos.filter(
			p => p.languageId === 1))?.length > 0 ? this.eventDetail.eventInfos.filter(
				p => p.languageId === 1)[0].shortDescription : null;
	}

	ngOnInit(): void {

		this.eventService.GetEventDetail(this.eventDetailId)
			.subscribe(p => this.eventDetail = p);
	}

	openInfo(): void {
		const modalRef = this.modalService.open(InfoModalComponent, { size:'lg' });
		modalRef.componentInstance.eventDetailId = this.eventDetailId
		modalRef.componentInstance.usage = 'CD'; // else case
		modalRef.componentInstance.playDate = this.eventDetail.start;
		modalRef.componentInstance.facebookPixelId = this.eventDetail.facebookPixelId;
	}

	openStaff(staffName: string) {
		const modalRef = this.modalService.open(AboutModalComponent, { size:'sm' });
		modalRef.componentInstance.staffName = staffName;
	}
}
