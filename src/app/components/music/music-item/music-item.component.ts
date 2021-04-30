import {Component, Input} from '@angular/core';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {TicketTypeInfo} from 'src/app/models/event.models';
import {MusicModalComponent} from '../music-modal/music-modal.component';

@Component({
	selector: 'app-music-item',
	templateUrl: './music-item.component.html',
	styleUrls: ['./music-item.component.scss']
})
export class MusicItemComponent {

	@Input() eventDetailId: number;
	@Input() imageUrl: string;
	@Input() name: string;
	@Input() usage: string;
	@Input() start: Date;

	ticketTypeInfo: TicketTypeInfo;

	constructor(private modalService: NgbModal) {
	}

	get comingSoon(): boolean {
		return (this.start > new Date());
	}

	get imagePath(): string {
		return "https://images.weserv.nl/?url=" + this.imageUrl + "&w=350&h=350";
	}

	openDetail(): void {
		const modalRef = this.modalService.open(MusicModalComponent, { size:'lg' });
		modalRef.componentInstance.eventDetailId = this.eventDetailId;
	}
}
