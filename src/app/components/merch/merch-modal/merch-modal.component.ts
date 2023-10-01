import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { MerchDetailComponent } from '../merch-detail/merch-detail.component';

@Component({
  selector: 'app-merch-modal',
  templateUrl: './merch-modal.component.html',
  standalone: true,
  imports: [MerchDetailComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MerchModalComponent {
  @Input() eventDetailId: number;

  constructor(public activeModal: NgbActiveModal) {}
}
