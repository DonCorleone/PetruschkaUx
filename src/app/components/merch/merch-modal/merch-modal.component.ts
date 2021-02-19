import { Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { EventDetail, EventDetailEventInfo } from 'src/app/models/event.models';
import { EventService } from 'src/app/services/event.service';

@Component({
  selector: 'app-merch-modal',
  templateUrl: './merch-modal.component.html',
  styleUrls: ['./merch-modal.component.scss']
})
export class MerchModalComponent implements OnInit {

  @Input() eventDetail: EventDetail;

  constructor(public activeModal: NgbActiveModal, private eventService: EventService) {}

  ngOnInit(): void {
    // // if (this.staffName) {
    // //   this.staff$ = this.staffService.GetStaff(this.staffName);
    // // }
  }
}
