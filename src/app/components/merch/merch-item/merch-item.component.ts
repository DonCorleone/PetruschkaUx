import {Component, Input, OnInit} from '@angular/core';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {EventDetail} from 'src/app/models/event.models';
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

	constructor(private modalService: NgbModal) {
	}

	get name(): string {
		return (this.eventDetail && this.eventDetail.eventInfos[0]) ? this.eventDetail.eventInfos[0].name : null;
	}

	get imagePath(): string {
		return EventService.GetPicSqrPathFromEventDetail(this.eventDetail, 'Tournee');
	}

	ngOnInit(): void {
	}

	openDetail(): void {
		const modalRef = this.modalService.open(MerchModalComponent);
		modalRef.componentInstance.eventDetail = this.eventDetail;
	}
}
