import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-newsletter-modal',
  templateUrl: './newsletter-modal.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NewsletterModalComponent {

  constructor(public activeModal: NgbActiveModal) {}
}
