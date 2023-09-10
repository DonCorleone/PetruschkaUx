import { ChangeDetectionStrategy, Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { Observable } from 'rxjs';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { NgxMasonryOptions } from 'ngx-masonry';
import { Netlifile } from 'src/app/services/images.service';
import { ImageModalComponent } from '../image-modal/image-modal.component';

@Component({
  selector: 'app-gallery-modal',
  templateUrl: './gallery-modal.component.html',
  styleUrls: ['./gallery-modal.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GalleryModalComponent {
  @Input() files: Netlifile[];

  constructor(public activeModal: NgbActiveModal, private modalService: NgbModal) {}

  public masonryOptions: NgxMasonryOptions = {
    gutter: 20,
  };

  limit = 15;

  itemsLoaded() {
    console.log('itemsloaded');
  }

  openImage(image: Netlifile) {
    const modalRef = this.modalService.open(ImageModalComponent, {
      size: 'xl' as 'lg',
      windowClass: 'modal-xxl',
      centered: true,
    });
    modalRef.componentInstance.image = image;
  }
}
