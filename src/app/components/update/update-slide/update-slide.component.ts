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
export class UpdateSlideComponent implements AfterViewInit {

	@Input() eventDetail: EventDetail;
	@Input() usage: string;

	constructor(private modalService: NgbModal, private eventService: EventService) {
	}

	superfutureEvent(eventDetail: EventDetail):boolean {
		return new Date(eventDetail.start) >= new Date()
			&& new Date(eventDetail.start).getHours() === 0;
	}

	futureEvent(eventDetail: EventDetail):boolean {

		let d = new Date();
		d.setDate(d.getDate() - 60);

		return new Date(eventDetail.start) >= d
			&& new Date(eventDetail.start).getHours() !== 0;
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

	ngAfterViewInit(): void {
		/* ======= Countdown ========= */
		// // set the date we're counting down to
		// const targetDate = new Date('July 08, 2021').getTime();

		// // get tag element
		// const countdown = document.getElementById('countdown-box');
		// const daysSpan = document.createElement('SPAN');
		// daysSpan.className = 'days';
		// countdown.appendChild(daysSpan);
		// const hoursSpan = document.createElement('SPAN');
		// hoursSpan.className = 'hours';
		// countdown.appendChild(hoursSpan);
		// const minutesSpan = document.createElement('SPAN');
		// minutesSpan.className = 'minutes';
		// countdown.appendChild(minutesSpan);
		// const secsSpan = document.createElement('SPAN');
		// secsSpan.className = 'secs';
		// countdown.appendChild(secsSpan);
		// setInterval(() => this.refreshCountDown(targetDate, daysSpan, hoursSpan, minutesSpan, secsSpan), 1000);

	}

	scrollTo(section) {
		document.querySelector('#' + section)
			.scrollIntoView({behavior: 'smooth'});
	}

	// refreshCountDown(targetDate: any, daysSpan: HTMLElement, hoursSpan: HTMLElement, minutesSpan: HTMLElement, secsSpan: HTMLElement) {

	// 	// variables for time units
	// 	let days;
	// 	let hours: number;
	// 	let minutes: number;
	// 	let seconds: number;

	// 	// find the amount of "seconds" between now and target
	// 	const currentDate = new Date().getTime();
	// 	let secondsLeft = (targetDate - currentDate) / 1000;

	// 	// do some time calculations
	// 	days = Math.round(secondsLeft / 86400);
	// 	secondsLeft = Math.round(secondsLeft % 86400);

	// 	hours = Math.round(secondsLeft / 3600);
	// 	secondsLeft = Math.round(secondsLeft % 3600);

	// 	minutes = Math.round(secondsLeft / 60);
	// 	seconds = Math.round(secondsLeft % 60);

	// 	// format countdown string + set tag value.
	// 	daysSpan.innerHTML = '<span class="number">' + days + '</span>' + '<span class="unit">Days</span>';
	// 	hoursSpan.innerHTML = '<span class="number">' + hours + '</span>' + '<span class="unit">Hrs</span>';
	// 	minutesSpan.innerHTML = '<span class="number">' + minutes + '</span>' + '<span class="unit">Mins</span>';
	// 	secsSpan.innerHTML = '<span class="number">' + seconds + '</span>' + '<span class="unit">Secs</span>';
	// }

	openInfo(eventDetail: EventDetail): void {
		const modalRef = this.modalService.open(InfoModalComponent, { size:'lg' });
		modalRef.componentInstance.eventDetailId = eventDetail._id;
		modalRef.componentInstance.usage = 'Premiere'; // else case
		modalRef.componentInstance.eventDetail$ = this.eventService.GetEventDetail(eventDetail._id);
	}

	openGallery(eventDetail: EventDetail):void{
		const modalRef = this.modalService.open(GalleryModalComponent, { size:'xl' });
		modalRef.componentInstance.albumHash = this.eventDetail.facebookPixelId;
	}
}
