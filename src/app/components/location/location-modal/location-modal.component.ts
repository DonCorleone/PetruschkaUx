import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { LocationIdName } from 'src/app/models/location.models';
import { LocationItemComponent } from '../location-item/location-item.component';

@Component({
  selector: 'app-location-modal',
  templateUrl: './location-modal.component.html',
  standalone: true,
  imports: [LocationItemComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LocationModalComponent {
  @Input() eventLocationIdName: LocationIdName;

  constructor(public activeModal: NgbActiveModal) {}
}
