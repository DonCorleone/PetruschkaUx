import {Component, Input, OnInit} from '@angular/core';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {EventDetail, EventDetailEventInfo} from 'src/app/models/event.models';
import {EventService} from 'src/app/services/event.service';

@Component({
	selector: 'app-info-modal',
	templateUrl: './info-modal.component.html',
	styleUrls: ['./info-modal.component.scss']
})
export class InfoModalComponent implements OnInit {

	@Input() eventDetailId: number;
	@Input() usage: string;
	@Input() playDate: Date;
	@Input() facebookPixelId: string;

	eventDetail$: Observable<EventDetail>;
	eventInfo: EventDetailEventInfo;

	constructor(public activeModal: NgbActiveModal, private eventService: EventService) {
	}

	ngOnInit() {

		this.eventService.GetEventDetail(this.eventDetailId)
			.pipe(p => this.eventDetail$ = p)
			.subscribe(({eventInfos}) => this.eventInfo = eventInfos.find(l => l.languageId === 1))
	}
}
