import {Component, Input, OnChanges} from '@angular/core';
import {DomSanitizer} from '@angular/platform-browser';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {EventDetailEventInfo} from 'src/app/models/event.models';
import {AboutModalComponent} from '../../about/about-modal/about-modal.component';
import {LocationModalComponent} from '../../location/location-modal/location-modal.component';

interface Job {
	name: string;
	jobsharers: string[];
}

@Component({
	selector: 'app-info-item',
	templateUrl: './info-item.component.html',
	styleUrls: ['./info-item.component.scss']
})
export class InfoComponent implements OnChanges {

	@Input() eventInfo: EventDetailEventInfo;
	@Input() reservationMail: string;
	@Input() usage: string;
	@Input() playDate: Date;


	artistsArray: Job[];

	constructor(
		private sanitizer: DomSanitizer, private modalService: NgbModal) {
	}

	get locationName(): string {
		return (this.eventInfo && this.eventInfo.location) ? this.eventInfo.location : null;
	}

	get artists(): Job[] {
		return (this.artistsArray && this.artistsArray.length > 0) ? this.artistsArray : null;
	}

	get name() {
		return (this.eventInfo && this.eventInfo.name) ? this.eventInfo.name : null;
	}

	get shortDesc(): string {
		return (this.eventInfo && this.eventInfo.shortDescription) ? this.eventInfo.shortDescription : null;
	}

	get plot() {
		return (this.eventInfo && this.eventInfo.longDescription) ? this.transformHtml(this.eventInfo.longDescription) : null;
	}

	get flyerImagePath(): string {
		return (this.eventInfo && this.eventInfo.bannerImagePath) ? this.eventInfo.bannerImagePath : null;
	}

	get locationLabel(): string {
		if (this.usage === 'Premiere') {
			return 'Spielstätte';
		} else {
			return `Das Stück ${this.isFutureEvent ? 'wird' : 'wurde'} aufgeführt im`;
		}
	}

	get isFutureEvent(): boolean {
		return new Date(this.playDate) > new Date();
	}

	get playDateLabel(): string {
		if (this.usage === 'Premiere') {
			return 'Premiere';
		} else if (this.usage === 'CD' || this.usage === 'Tournee') {
			return `Urauführung`;
		} else {
			return `Das Stück ${this.isFutureEvent ? 'wird' : 'wurde'} aufgeführt am`;
		}
	}

	ngOnChanges(): void {
		if (this.eventInfo && this.eventInfo.artists) {
			this.artistsArray = this.GetStaffLinks(this.eventInfo.artists);
		}
	}

	openStaff(staffName: string) {
		const modalRef = this.modalService.open(AboutModalComponent);
		modalRef.componentInstance.staffName = staffName;
	}

	openLocation(locationName: string) {
		const modalRef = this.modalService.open(LocationModalComponent);
		modalRef.componentInstance.eventLocationName = locationName;
	}

	transformHtml(htmlTextWithStyle) {
		return this.sanitizer.bypassSecurityTrustHtml(htmlTextWithStyle);
	}

	GetStaffLinks(staff: string): Job [] {

		const jobs = staff.split('|');
		const returnval: Job [] = [];

		jobs.forEach(job => {
			const ixOfSplitter = job.indexOf(':');

			const jobsharerArray: string[] = [];

			const jobdesc: string = job.slice(0, ixOfSplitter);
			const jobsharers = job.substring(ixOfSplitter + 1).split('&');

			jobsharers.forEach(jobsharePartner => {

				jobsharerArray.push(jobsharePartner.trim());
			});

			const jobObject: Job = {
				name: jobdesc.trim(),
				jobsharers: jobsharerArray
			};

			returnval.push(jobObject);
		});

		return returnval;
	}
}
