import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { MusicDetailComponent } from '../music-detail/music-detail.component';

@Component({
  selector: 'app-music-modal',
  templateUrl: './music-modal.component.html',
  standalone: true,
  imports: [MusicDetailComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MusicModalComponent {
  @Input() eventDetailId: number;

  constructor(public activeModal: NgbActiveModal) {}
}
