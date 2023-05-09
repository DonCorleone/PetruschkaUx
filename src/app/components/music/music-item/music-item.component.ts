import {ChangeDetectionStrategy, Component, Input, OnInit} from '@angular/core';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {EventDetail, EventDetailEventInfo, TicketTypeInfo} from 'src/app/models/event.models';
import {MusicModalComponent} from '../music-modal/music-modal.component';
import {EventService} from "../../../services/event.service";

@Component({
	selector: 'app-music-item',
	templateUrl: './music-item.component.html',
	styleUrls: ['./music-item.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class MusicItemComponent implements OnInit{
	@Input() eventDetail: EventDetail;
	@Input() usage: string;

	eventInfo: EventDetailEventInfo | undefined;
	comingSoon: boolean;
	imageUrl: string;

	constructor(private modalService: NgbModal) {
	}

	ngOnInit(): void {
		this.eventInfo = this.eventDetail?.eventInfos?.find((p) => p.languageId === 0)
		this.comingSoon = this.eventDetail.start > new Date();
		this.imageUrl = this.GetImageUrl(this.eventDetail);
	}
	openDetail(): void {
		const modalRef = this.modalService.open(MusicModalComponent, { size:'lg' });
		modalRef.componentInstance.eventDetailId = this.eventDetail?._id;
	}
	GetImageUrl(eventDetail: EventDetail):string{
		return EventService.GetTicketTypeInfoFromEventDetail(eventDetail, 'CD')?.imageUrl;
	}
}
