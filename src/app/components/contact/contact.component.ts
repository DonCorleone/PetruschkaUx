import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { LocationModalComponent } from '../location/location-modal/location-modal.component';

@Component({
	selector: 'app-contact',
	templateUrl: './contact.component.html',
	styleUrls: ['./contact.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class ContactComponent implements OnInit {

	constructor(private modalService: NgbModal) {
	}

	ngOnInit() {
	}
	openLocation(locationName: string) {
		const modalRef = this.modalService.open(LocationModalComponent, { size:'lg' });
		modalRef.componentInstance.eventLocationName = locationName;
	}
	scrollTo(section) {
		document.querySelector('#' + section)
			.scrollIntoView({behavior: 'smooth',  block:'center'});
	}
}
