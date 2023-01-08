import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-contact-overview',
  templateUrl: './contact.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ContactComponentOverview {}
