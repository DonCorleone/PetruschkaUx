import { ChangeDetectionStrategy, Component } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NewsletterModalComponent } from '../newsletter/newsletter-modal/newsletter-modal.component';
import {ImpressumModalComponent} from "../impressum-modal/impressum-modal.component";

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FooterComponent {

  constructor(private modalService: NgbModal) {}

  openNewsletterForm(): void {
    const modalRef = this.modalService.open(NewsletterModalComponent, { size: 'lg' });
  }

	openImpressum(): void {
		const modalRef = this.modalService.open(ImpressumModalComponent, { size: 'lg' });
	}
}
