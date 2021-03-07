import {Component, Input, OnInit} from '@angular/core';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {EventDetail} from 'src/app/models/event.models';
import {EventService} from 'src/app/services/event.service';
import {InfoModalComponent} from '../../info/info-modal/info-modal.component';

@Component({
	selector: 'app-music-detail',
	templateUrl: './music-detail.component.html',
	styleUrls: ['./music-detail.component.scss']
})
export class MusicDetailComponent implements OnInit {

	@Input() eventDetail: EventDetail;

	constructor(private modalService: NgbModal) {
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
		return EventService.GetPicSqrPathFromEventDetail(this.eventDetail, 'CD');
	}

	ngOnInit(): void {
	}

	openInfo(): void {
		const modalRef = this.modalService.open(InfoModalComponent);
		modalRef.componentInstance.eventDetailId = this.eventDetail._id;
		modalRef.componentInstance.usage = 'Tournee'; // else case
		modalRef.componentInstance.playDate = this.eventDetail.start;
	}
}
