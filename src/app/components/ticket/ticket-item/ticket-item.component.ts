import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { TicketPrice } from '../../../models/event.models';

@Component({
  selector: 'app-ticket-item',
  templateUrl: './ticket-item.component.html',
	styleUrls: ['./ticket-item.component.scss'],
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TicketItemComponent {
  @Input() ticketPrices: TicketPrice[];
}
