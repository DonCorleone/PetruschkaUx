import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { NewsletterItemComponent } from '../newsletter-item/newsletter-item.component';

@Component({
  selector: 'app-newsletter-modal',
  templateUrl: './newsletter-modal.component.html',
  standalone: true,
  imports: [NewsletterItemComponent],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NewsletterModalComponent {

  constructor(public activeModal: NgbActiveModal) {}
}
