import {Component, Input, OnInit} from '@angular/core';
import {Observable} from 'rxjs';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';

import { NgxMasonryOptions, NgxMasonryComponent } from 'ngx-masonry';
import { File, ImagesService } from 'src/app/services/images.service';
import { resultKeyNameFromField } from '@apollo/client/utilities';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-gallery-modal',
  templateUrl: './gallery-modal.component.html',
  styleUrls: ['./gallery-modal.component.scss']
})
export class GalleryModalComponent implements OnInit {

	@Input() albumHash:string;

	constructor(public activeModal: NgbActiveModal, private imageService:ImagesService) {

	}

	public masonryOptions: NgxMasonryOptions = {
    gutter: 20,
  };

	image4Images: Observable<File[]>;
  limit = 15;

  ngOnInit() {
		this.image4Images = this.imageService.getAlbum(this.albumHash)
			.pipe(map (p => p.files));
  }

	itemsLoaded() {
    console.log('itemsloaded');
  }
}
