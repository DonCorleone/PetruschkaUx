import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { LocationIdName } from 'src/app/models/location.models';

@Component({
  selector: 'app-location-modal',
  templateUrl: './location-modal.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LocationModalComponent {
  @Input() eventLocationIdName: LocationIdName;

  constructor(public activeModal: NgbActiveModal) {}
}
