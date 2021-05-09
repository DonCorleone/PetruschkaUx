import {ChangeDetectionStrategy, Component, Input, OnInit} from '@angular/core';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {EventDetail} from 'src/app/models/event.models';

@Component({
	selector: 'app-merch-modal',
	templateUrl: './merch-modal.component.html',
	styleUrls: ['./merch-modal.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class MerchModalComponent implements OnInit {

	@Input() eventDetailId: number;

	constructor(public activeModal: NgbActiveModal) {
	}

	ngOnInit(): void {
	}
}
