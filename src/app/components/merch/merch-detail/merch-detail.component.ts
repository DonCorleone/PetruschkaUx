import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { EventDetail, TicketTypeInfo } from 'src/app/models/event.models';
import { EventService } from 'src/app/services/event.service';
import { InfoModalComponent } from '../../info/info-modal/info-modal.component';
import { AboutModalComponent } from '../../../modules/about/about-modal/about-modal.component';
import { StaffService } from '../../../services/staff.service';

@Component({
  selector: 'app-merch-detail',
  templateUrl: './merch-detail.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MerchDetailComponent implements OnInit {
  @Input() eventDetailId: number;

  eventDetail$: Observable<EventDetail>;

  GetTicketTypeInfoFromEventDetail(eventDetail: EventDetail) {
    return EventService.GetTicketTypeInfoFromEventDetail(eventDetail, 'Tournee');
  }

  ArtistsArray(ticketTypeInfo: TicketTypeInfo) {
    return StaffService.GetStaffLinks(ticketTypeInfo.description);
  }

  eventName(eventDetail: EventDetail): string {
    return (eventDetail && eventDetail.eventInfos?.filter((p) => p.languageId === 0))?.length > 0
      ? eventDetail.eventInfos?.filter((p) => p.languageId === 0)[0].name
      : null;
  }

  imagePath(ticketTypeInfo: TicketTypeInfo): string {
    return ticketTypeInfo ? ticketTypeInfo.imageUrl + '?nf_resize=smartcrop&w=900&h=900' : '';
  }

  constructor(private modalService: NgbModal, private staffService: StaffService, private eventService: EventService) {}

  ngOnInit(): void {
    this.eventDetail$ = this.eventService.GetEventDetail(this.eventDetailId);
  }

  openInfo(): void {
    const modalRef = this.modalService.open(InfoModalComponent, { size: 'lg' });
    modalRef.componentInstance.eventDetailId = this.eventDetailId;
    modalRef.componentInstance.usage = 'Tournee'; // else case
    modalRef.componentInstance.eventDetail$ = this.eventDetail$;
  }

  openStaff(staffName: string) {
    const modalRef = this.modalService.open(AboutModalComponent, { size: 'sm' });
    modalRef.componentInstance.staffName = staffName;
  }
}
