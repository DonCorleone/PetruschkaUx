import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { EventDetail, TicketTypeInfo } from 'src/app/models/event.models';
import { EventService } from 'src/app/services/event.service';
import { InfoModalComponent } from '../../info/info-modal/info-modal.component';
import { AboutModalComponent } from '../../about/about-modal/about-modal.component';
import { StaffService } from '../../../services/staff.service';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { take } from 'rxjs/operators';
import { Job } from '../../../models/staff.models';
import { of } from 'rxjs';

@Component({
  selector: 'app-music-detail',
  templateUrl: './music-detail.component.html',
  standalone: true,
  imports: [CommonModule, NgOptimizedImage],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MusicDetailComponent implements OnInit {
  @Input() eventDetailId: number;

  eventDetail: EventDetail;
  shortDesc: string;
  ticketTypeInfo: TicketTypeInfo;
  artistsArray: Job[];
  eventName: string;
  imagePath: string;

  getImagePath(ticketTypeInfo: TicketTypeInfo): string {
    const imageUrl = ticketTypeInfo?.imageUrl;
    return imageUrl ? imageUrl + '?nf_resize=fit&w=900' : '';
  }
  constructor(
    private modalService: NgbModal,
    private eventService: EventService,
    private changeDetectionRef: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.eventService
      .GetEventDetail(this.eventDetailId)
      .pipe(take(1))
      .subscribe((eventDetail) => {
        this.eventDetail = eventDetail;
        const eventDetailEventInfo = eventDetail.eventInfos?.filter((p) => p.languageId === 0)?.pop();
        this.shortDesc = eventDetailEventInfo?.shortDescription;
        this.eventName = eventDetailEventInfo?.name;

        const ticketTypeInfo = EventService.GetTicketTypeInfoFromEventDetail(eventDetail, 'CD');
        this.ticketTypeInfo = ticketTypeInfo;
        this.artistsArray = StaffService.GetStaffLinks(ticketTypeInfo.description);
        this.imagePath = this.getImagePath(ticketTypeInfo);

        this.changeDetectionRef.markForCheck();
      });
  }

  openInfo(): void {
    const modalRef = this.modalService.open(InfoModalComponent, { size: 'lg' });
    modalRef.componentInstance.eventDetailId = this.eventDetailId;
    modalRef.componentInstance.usage = 'CD'; // else case
    modalRef.componentInstance.eventDetail$ = of(this.eventDetail);
  }

  openStaff(staffName: string) {
    const modalRef = this.modalService.open(AboutModalComponent, { size: 'sm' });
    modalRef.componentInstance.staffName = staffName;
  }
}
