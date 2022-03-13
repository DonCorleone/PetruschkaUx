import {ChangeDetectionStrategy, Component} from '@angular/core';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-ticket-modal',
  templateUrl: './ticket-modal.component.html',
  styleUrls: ['./ticket-modal.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class TicketModalComponent {

	constructor(public activeModal: NgbActiveModal) {
	}
}
