import {ChangeDetectionStrategy, Component, Input, OnInit} from '@angular/core';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';

@Component({
	selector: 'app-music-modal',
	templateUrl: './music-modal.component.html',
	styleUrls: ['./music-modal.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class MusicModalComponent implements OnInit {

	@Input() eventDetailId: number;

	constructor(public activeModal: NgbActiveModal) {
	}

	ngOnInit(): void {
	}
}
