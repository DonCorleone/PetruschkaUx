import { Component, Input, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { EventDetail, EventDetailEventInfo } from 'src/app/models/event.models';
import { EventService } from 'src/app/services/event.service';
import { InfoComponent } from '../../info/info.component';

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
    const modalRef = this.modalService.open(InfoComponent);
    modalRef.componentInstance.name = 'World';
  }
}
