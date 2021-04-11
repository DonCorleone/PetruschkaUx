import { Component, Input } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { EventDetail } from 'src/app/models/event.models';
import { EventService } from 'src/app/services/event.service';
import { GalleryModalComponent } from '../../gallery/gallery-modal/gallery-modal.component';
import { InfoModalComponent } from '../../info/info-modal/info-modal.component';

@Component({
  selector: 'app-history-item',
  templateUrl: './history-item.component.html',
  styleUrls: ['./history-item.component.scss']
})
export class HistoryItemComponent {

	@Input() eventDetail: EventDetail;
	@Input() usage: string;

	constructor(private modalService: NgbModal) {
	}

	get name() {
		return EventService.GetNameFromEventDetail(this.eventDetail);
	}

	get shortDescription(): string {
		return EventService.GetShortDescFromEventDetail(this.eventDetail);
	}

	get imagePath(): string {
		return EventService.GetFlyerImagePathFromEventDetail(this.eventDetail);
	}

	get start(): Date {
		return this.eventDetail.start;
	}

	scrollTo(section) {
		document.querySelector('#' + section)
			.scrollIntoView({behavior: 'smooth'});
	}

	openInfo(): void {
		const modalRef = this.modalService.open(InfoModalComponent, { size:'lg' });
		modalRef.componentInstance.eventDetailId = this.eventDetail._id;
		modalRef.componentInstance.usage = ''; // else case
		modalRef.componentInstance.playDate = this.eventDetail.start; // else case
		modalRef.componentInstance.facebookPixelId = this.eventDetail.facebookPixelId;
	}

	openGallery():void{
		const modalRef = this.modalService.open(GalleryModalComponent, { size:'xl' });
		modalRef.componentInstance.albumHash = this.eventDetail.facebookPixelId;
	}
}


