import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-merch-modal',
  templateUrl: './merch-modal.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MerchModalComponent {
  @Input() eventDetailId: number;

  constructor(public activeModal: NgbActiveModal) {}
}
