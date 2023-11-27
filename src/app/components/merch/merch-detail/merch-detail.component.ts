import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import { of } from 'rxjs';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { EventDetail, TicketTypeInfo } from 'src/app/models/event.models';
import { EventService } from 'src/app/services/event.service';
import { InfoModalComponent } from '../../info/info-modal/info-modal.component';
import { AboutModalComponent } from '../../about/about-modal/about-modal.component';
import { StaffService } from '../../../services/staff.service';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { take } from 'rxjs/operators';
import { Job } from '../../../models/staff.models';

@Component({
  selector: 'app-merch-detail',
  templateUrl: './merch-detail.component.html',
  standalone: true,
  imports: [CommonModule, NgOptimizedImage],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MerchDetailComponent implements OnInit {
  @Input() eventDetailId: number;

  eventDetail: EventDetail;
  eventName: string | undefined;
  ticketTypeInfo: TicketTypeInfo;
  artistsArray: Job[];
  imagePath: string;
  imageDimension: number;

  getImagePath(ticketTypeInfo: TicketTypeInfo): string {
    return ticketTypeInfo
      ? ticketTypeInfo.imageUrl + `?nf_resize=smartcrop&w=${this.imageDimension}&h=${this.imageDimension}`
      : '';
  }

  constructor(
    private modalService: NgbModal,
    private staffService: StaffService,
    private eventService: EventService,
    private changeDetectionRef: ChangeDetectorRef
  ) {
    this.imageDimension = 900;
  }

  ngOnInit(): void {
    this.eventService
      .GetEventDetail(this.eventDetailId)
      .pipe(take(1))
      .subscribe((eventDetail) => {
        this.eventDetail = eventDetail;
        const eventDetailEventInfo = eventDetail.eventInfos?.filter((p) => p.languageId === 0)?.pop();
        this.eventName = eventDetailEventInfo?.name;

        const ticketTypeInfo = EventService.GetTicketTypeInfoFromEventDetail(eventDetail, 'Tournee');
        this.ticketTypeInfo = ticketTypeInfo;
        this.artistsArray = StaffService.GetStaffLinks(ticketTypeInfo.description);
        this.imagePath = this.getImagePath(ticketTypeInfo);

        this.changeDetectionRef.markForCheck();
      });
  }

  openInfo(): void {
    const modalRef = this.modalService.open(InfoModalComponent, { size: 'lg' });
    modalRef.componentInstance.eventDetailId = this.eventDetailId;
    modalRef.componentInstance.usage = 'Tournee'; // else case
    modalRef.componentInstance.eventDetail$ = of(this.eventDetail);
  }

  openStaff(staffName: string) {
    const modalRef = this.modalService.open(AboutModalComponent, { size: 'sm' });
    modalRef.componentInstance.staffName = staffName;
  }
}
