import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { EventDetail, EventDetailEventInfo, TicketTypeInfo } from 'src/app/models/event.models';
import { EventService } from 'src/app/services/event.service';
import { InfoModalComponent } from '../../info/info-modal/info-modal.component';
import { Job } from '../../../models/staff.models';
import { AboutModalComponent } from '../../../modules/about/about-modal/about-modal.component';
import { StaffService } from '../../../services/staff.service';

@Component({
  selector: 'app-merch-detail',
  templateUrl: './merch-detail.component.html',
  styleUrls: ['./merch-detail.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MerchDetailComponent implements OnInit {
  @Input() eventDetailId: number;

  eventDetail$: Observable<EventDetail>;
  artistsArray: Job[];

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
    return ticketTypeInfo ? 'https://images.weserv.nl/?url=' + ticketTypeInfo.imageUrl + '&w=899&h=899' : null;
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
