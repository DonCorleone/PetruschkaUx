import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { TicketPrice } from '../../../models/event.models';
import { TicketItemComponent } from '../ticket-item/ticket-item.component';

@Component({
  selector: 'app-ticket-modal',
  templateUrl: './ticket-modal.component.html',
  standalone: true,
  imports: [TicketItemComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TicketModalComponent {
  @Input() ticketPrices: TicketPrice[];
  constructor(public activeModal: NgbActiveModal) {}
}
