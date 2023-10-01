import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-music-modal',
  templateUrl: './music-modal.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MusicModalComponent {
  @Input() eventDetailId: number;

  constructor(public activeModal: NgbActiveModal) {}
}
