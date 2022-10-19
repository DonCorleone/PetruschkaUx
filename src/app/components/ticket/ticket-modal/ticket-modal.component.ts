import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import {TicketPrice, TicketType} from '../../../models/event.models';

@Component({
  selector: 'app-ticket-modal',
  templateUrl: './ticket-modal.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TicketModalComponent {
  @Input() ticketPrices: TicketPrice[];
  constructor(public activeModal: NgbActiveModal) {}
}
