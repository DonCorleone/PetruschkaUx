import { AfterViewInit, ChangeDetectionStrategy, Component, Input, OnInit, ViewChild } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Netlifile } from 'src/app/services/images.service';

@Component({
  selector: 'app-image-modal',
  templateUrl: './image-modal.component.html',
  styleUrls: ['./image-modal.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ImageModalComponent implements AfterViewInit {
  @Input() image: Netlifile;

  classes = {};
  @ViewChild('container') container: any;

  constructor(public activeModal: NgbActiveModal) {}

  ngAfterViewInit(): void {
    const node = this.container.nativeElement;
    this.classes = {
      'image-strech-height': node.offsetHeight > node.offsetWidth,
      'image-strech-width': node.offsetWidth > node.offsetHeight,
    };
  }
}
