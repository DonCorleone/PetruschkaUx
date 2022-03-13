import {AfterViewInit, ChangeDetectionStrategy, Component, Input} from '@angular/core';
import {NgbModal, NgbModalOptions} from '@ng-bootstrap/ng-bootstrap';
import {EventDetail} from 'src/app/models/event.models';
import {EventService} from 'src/app/services/event.service';
import { GalleryModalComponent } from '../../gallery/gallery-modal/gallery-modal.component';
import { InfoModalComponent } from '../../info/info-modal/info-modal.component';

@Component({
	selector: 'app-update-slide',
	templateUrl: './update-slide.component.html',
	styleUrls: ['./update-slide.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class UpdateSlideComponent {

	@Input() eventDetail: EventDetail;
	@Input() usage: string;

	constructor(private modalService: NgbModal, private eventService: EventService) {
	}

	superfutureEvent(eventDetail: EventDetail):boolean {
		return new Date(eventDetail.start) >= new Date()
			&& new Date(eventDetail.start).getHours() === 0;
	}

	featurePremiereEvent(eventDetail: EventDetail):string {
		return eventDetail.googleAnalyticsTracker === "Premiere" ? "Premiere" : "Nächste Aufführung";
	}

	futureEvent(eventDetail: EventDetail):boolean {

		return new Date(eventDetail.start) >= new Date()
			&& new Date(eventDetail.start).getHours() !== 0
	}

	pastEvent(eventDetail: EventDetail):boolean {

		return new Date(eventDetail.start) < new Date();
	}

	name(eventDetail: EventDetail) {
		return EventService.GetNameFromEventDetail(eventDetail);
	}

	shortDescription(eventDetail: EventDetail): string {
		return EventService.GetShortDescFromEventDetail(eventDetail);
	}

	importantNotes(eventDetail: EventDetail): string {
		return EventService.GetImportantNotesFromEventDetail(eventDetail);
	}

	imagePath(eventDetail: EventDetail): string {
		return EventService.GetFlyerImagePathFromEventDetail(eventDetail);
	}

	scrollTo(section) {
		document.querySelector('#' + section)
			.scrollIntoView({behavior: 'smooth'});
	}

	openInfo(eventDetail: EventDetail): void {
		const modalRef = this.modalService.open(InfoModalComponent, { size:'lg' });
		modalRef.componentInstance.eventDetailId = eventDetail._id;
		modalRef.componentInstance.usage = 'Premiere'; // else case
		modalRef.componentInstance.tag = eventDetail.googleAnalyticsTracker;
		modalRef.componentInstance.eventDetail$ = this.eventService.GetEventDetail(eventDetail._id);
	}

	openGallery(eventDetail: EventDetail):void{
		const modalRef = this.modalService.open(GalleryModalComponent, { size:'xl' });
		modalRef.componentInstance.albumHash = this.eventDetail.facebookPixelId;
	}
}
