import { ChangeDetectionStrategy, Component } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { LocationModalComponent } from '../location/location-modal/location-modal.component';
import { LoadingIndicatorComponent } from '../loading-indicator/loading-indicator.component';
import { RouterLink } from '@angular/router';
import { PressComponent } from '../press/press.component';
import { SponsorsComponent } from '../sponsors/sponsors.component';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss'],
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [LoadingIndicatorComponent, RouterLink, PressComponent, SponsorsComponent],
})
export class ContactComponent {
  constructor(private modalService: NgbModal) {}

  openLocation(locationName: string) {
    const modalRef = this.modalService.open(LocationModalComponent, { size: 'lg' });
    modalRef.componentInstance.eventLocationName = locationName;
  }
  scrollTo(section) {
    document.querySelector('#' + section).scrollIntoView({ behavior: 'smooth', block: 'center' });
  }
}
