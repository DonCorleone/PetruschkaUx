import { ChangeDetectionStrategy, Component } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NewsletterModalComponent } from '../newsletter-modal/newsletter-modal.component';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FooterComponent {

  constructor(private modalService: NgbModal) {}

  openNewsletterForm(): void {
    const modalRef = this.modalService.open(NewsletterModalComponent, { size: 'lg' });
  }
}
