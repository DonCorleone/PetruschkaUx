import {ChangeDetectionStrategy, Component, Input, OnInit} from '@angular/core';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';

@Component({
	selector: 'app-location-modal',
	templateUrl: './location-modal.component.html',
	styleUrls: ['./location-modal.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class LocationModalComponent implements OnInit {

	@Input() eventLocationName: string;

	constructor(public activeModal: NgbActiveModal) {
	}

	ngOnInit(): void {
	}
}
