import {Component, Input, OnInit} from '@angular/core';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {EventDetail} from 'src/app/models/event.models';

@Component({
	selector: 'app-music-modal',
	templateUrl: './music-modal.component.html',
	styleUrls: ['./music-modal.component.scss']
})
export class MusicModalComponent implements OnInit {

	@Input() eventDetailId: number;

	constructor(public activeModal: NgbActiveModal) {
	}

	ngOnInit(): void {
	}
}
