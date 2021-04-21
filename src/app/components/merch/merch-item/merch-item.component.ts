import {Component, Input} from '@angular/core';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {MerchModalComponent} from '../merch-modal/merch-modal.component';

@Component({
	selector: 'app-merch-item',
	templateUrl: './merch-item.component.html',
	styleUrls: ['./merch-item.component.scss']
})
export class MerchItemComponent {

	@Input() eventDetailId: number;
	@Input() imageUrl: string;
	@Input() name: string;
	@Input() usage: string;

	constructor(private modalService: NgbModal) {
	}

	get imagePath(): string {
		return "https://images.weserv.nl/?url=" + this.imageUrl + "&w=350&h=350";
	}

	openDetail(): void {
		const modalRef = this.modalService.open(MerchModalComponent, { size:'lg' });
		modalRef.componentInstance.eventDetailId = this.eventDetailId;
	}
}
