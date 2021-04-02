import {Component, Input, OnInit} from '@angular/core';
import {Observable} from 'rxjs';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-gallery-modal',
  templateUrl: './gallery-modal.component.html',
  styleUrls: ['./gallery-modal.component.scss']
})
export class GalleryModalComponent implements OnInit {

	constructor(public activeModal: NgbActiveModal) {
	}

  ngOnInit(): void {
  }

}
