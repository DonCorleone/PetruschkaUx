import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { NgxMasonryOptions, NgxMasonryComponent } from 'ngx-masonry';
import { File, ImagesService } from 'src/app/services/images.service';
import { resultKeyNameFromField } from '@apollo/client/utilities';
import { map } from 'rxjs/operators';
import { ImageModalComponent } from '../image-modal/image-modal.component';

@Component({
  selector: 'app-gallery-modal',
  templateUrl: './gallery-modal.component.html',
  styleUrls: ['./gallery-modal.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GalleryModalComponent {
  @Input() image4Images: Observable<File[]>;

  constructor(
    public activeModal: NgbActiveModal,
    private modalService: NgbModal,
    private imageService: ImagesService
  ) {}

  public masonryOptions: NgxMasonryOptions = {
    gutter: 20,
  };

  limit = 15;

  itemsLoaded() {
    console.log('itemsloaded');
  }

  openImage(image: File) {
    const modalRef = this.modalService.open(ImageModalComponent, {
      size: 'xl' as 'lg',
      windowClass: 'modal-xxl',
      centered: true,
    });
    modalRef.componentInstance.image = image;
  }
}
