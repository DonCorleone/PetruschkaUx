import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-ticket-item',
  templateUrl: './ticket-item.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TicketItemComponent {}
