import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { map, take, tap } from 'rxjs/operators';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { EventDetail, EventDetailEventInfo } from 'src/app/models/event.models';
import { EventService } from 'src/app/services/event.service';

@Component({
	selector: 'app-info-modal',
	templateUrl: './info-modal.component.html',
	styleUrls: ['./info-modal.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class InfoModalComponent implements OnInit {

	@Input() eventDetailId: number;
	@Input() usage: string;
	@Input() eventDetail$: Observable<EventDetail>;

	eventInfo$: Observable<EventDetailEventInfo>;

	constructor(public activeModal: NgbActiveModal, private eventService: EventService) {
	}

	ngOnInit() {

		this.eventInfo$ = this.eventDetail$
			.pipe(
				tap(c => console.log(c)),
				map(p => {
					return p.eventInfos.find(f => f.languageId === 1);
				}
				)
			)
	}
}
