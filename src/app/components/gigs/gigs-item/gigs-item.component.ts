import { Component, Input, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { EventDetail, EventDetailEventInfo } from 'src/app/models/event.models';
import { EventService } from 'src/app/services/event.service';
import { InfoModalComponent } from '../../info/info-modal/info-modal.component';
import { InfoComponent } from '../../info/info.component';
import { LocationModalComponent } from '../../location/location-modal/location-modal.component';
import { LocationComponent } from '../../location/location.component';
import { ModalComponent } from '../../modal/modal.component';

@Component({
  selector: 'app-gigs-item',
  templateUrl: './gigs-item.component.html',
  styleUrls: ['./gigs-item.component.scss']
})
export class GigsItemComponent implements OnInit {

  public isCollapsed = true;
  @Input() start: Date;
  @Input() eventInfoDe: EventDetailEventInfo;

  constructor(private modalService: NgbModal) { }

  ngOnInit(): void {
  }

  open() {
    const modalRef = this.modalService.open(InfoModalComponent);
    modalRef.componentInstance.innerHtml = document.getElementsByClassName("shortDescription").item[0];
  }

  openLocation(locationName:string) {
    const modalRef = this.modalService.open(LocationModalComponent);
    modalRef.componentInstance.eventLocationName = locationName;
  }
}
