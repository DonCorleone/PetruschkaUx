import {ChangeDetectionStrategy, Component, Input, OnInit} from '@angular/core';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {MerchModalComponent} from '../merch-modal/merch-modal.component';
import {EventDetail, EventDetailEventInfo} from "../../../models/event.models";
import {EventService} from "../../../services/event.service";

@Component({
	selector: 'app-merch-item',
	templateUrl: './merch-item.component.html',
	styleUrls: ['./merch-item.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class MerchItemComponent implements OnInit{

	@Input() eventDetail: EventDetail;
	@Input() usage: string;

	eventInfo: EventDetailEventInfo | undefined;
	imageUrl: string;

	constructor(private modalService: NgbModal) {
	}

	GetImageUrl(eventDetail: EventDetail):string{
		const imageUrl = EventService.GetTicketTypeInfoFromEventDetail(eventDetail, 'Tournee')?.imageUrl;
		return imageUrl ? imageUrl + '?nf_resize=smartcrop&w=300&h=300' : '';
	}

	openDetail(): void {
		const modalRef = this.modalService.open(MerchModalComponent, { size:'lg' });
		modalRef.componentInstance.eventDetailId = this.eventDetail?._id;
	}

	ngOnInit(): void {
		this.eventInfo = this.eventDetail?.eventInfos?.find((p) => p.languageId === 0);
		this.imageUrl = this.GetImageUrl(this.eventDetail);
	}
}
