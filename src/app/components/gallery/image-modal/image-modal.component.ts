import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { File } from 'src/app/services/images.service';

@Component({
  selector: 'app-image-modal',
  templateUrl: './image-modal.component.html',
  styleUrls: ['./image-modal.component.scss']
})
export class ImageModalComponent implements OnInit {

	@Input() image: File;

	constructor(public activeModal: NgbActiveModal) {

	}

  ngOnInit(): void {

  }

	calculateClasses() {
		return {
				'image-strech-height': this.image.height > this.image.width,
				'image-strech-width': this.image.width > this.image.height
		};
}
}
