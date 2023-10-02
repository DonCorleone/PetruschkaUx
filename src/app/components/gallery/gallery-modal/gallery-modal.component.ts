import { ChangeDetectionStrategy, Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { Observable } from 'rxjs';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { Netlifile } from 'src/app/services/images.service';
import { ImageModalComponent } from '../image-modal/image-modal.component';
import { SwiperComponent } from 'src/app/modules/shared/swiper/swiper.component';

@Component({
  selector: 'app-gallery-modal',
  templateUrl: './gallery-modal.component.html',
  standalone: true,
  imports: [SwiperComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GalleryModalComponent {
  @Input() files: Netlifile[];
  @Input() eventName: string;

  constructor(public activeModal: NgbActiveModal, private modalService: NgbModal) {}

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
