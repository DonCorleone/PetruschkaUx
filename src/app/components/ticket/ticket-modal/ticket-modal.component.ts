import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-ticket-modal',
  templateUrl: './ticket-modal.component.html',
  styleUrls: ['./ticket-modal.component.scss']
})
export class TicketModalComponent implements OnInit {

	constructor(public activeModal: NgbActiveModal) {
	}

  ngOnInit(): void {
  }

}
