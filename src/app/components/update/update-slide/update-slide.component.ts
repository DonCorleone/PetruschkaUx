import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { EventDetail, EventDetailEventInfo } from 'src/app/models/event.models';
import { EventService } from 'src/app/services/event.service';
import { InfoModalComponent } from '../../info/info-modal/info-modal.component';
import { CommonModule, DatePipe } from '@angular/common';
import {RouterLink} from "@angular/router";

@Component({
  selector: 'app-update-slide',
  templateUrl: './update-slide.component.html',
  styleUrls: ['./update-slide.component.scss'],
  standalone: true,
	imports: [DatePipe, CommonModule, RouterLink],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UpdateSlideComponent implements OnInit {
  @Input() eventDetail: EventDetail;
  @Input() usage: string;

  eventInfo: EventDetailEventInfo;
  superfutureEvent: boolean;
  featurePremiereEventStr: string;
  futureEvent: boolean;
  pastEvent: boolean;
  imagePath: string;

  constructor(private modalService: NgbModal, private eventService: EventService) {}

  ngOnInit(): void {
    this.eventInfo = this.eventDetail?.eventInfos?.find((p) => p.languageId === 0);

    this.superfutureEvent = this.isSuperfutureEvent(this.eventDetail);
    this.featurePremiereEventStr = this.getFeaturePremiereEventStr(this.eventDetail);
    this.futureEvent = this.isFutureEvent(this.eventDetail);
    this.pastEvent = this.isPastEvent(this.eventDetail);
    this.imagePath = this.getImagePath(this.eventDetail);
  }

  private isSuperfutureEvent(eventDetail: EventDetail): boolean {
    return new Date(eventDetail.start) >= new Date() && new Date(eventDetail.start).getHours() === 0;
  }

  private getFeaturePremiereEventStr(eventDetail: EventDetail): string {
    return eventDetail.googleAnalyticsTracker === 'Premiere' ? 'Premiere' : 'Nächste Aufführung';
  }

  private isFutureEvent(eventDetail: EventDetail): boolean {
    return new Date(eventDetail.start) >= new Date() && new Date(eventDetail.start).getHours() !== 0;
  }

  private isPastEvent(eventDetail: EventDetail): boolean {
    return new Date(eventDetail.start) < new Date();
  }
  private getImagePath(eventDetail: EventDetail): string {
    return EventService.GetFlyerImagePathFromEventDetail(eventDetail);
  }

  openInfo(eventDetail: EventDetail): void {
    const modalRef = this.modalService.open(InfoModalComponent, { size: 'lg' });
    modalRef.componentInstance.eventDetailId = eventDetail._id;
    modalRef.componentInstance.usage = 'Premiere'; // else case
    modalRef.componentInstance.saleState = eventDetail.saleState;
    modalRef.componentInstance.eventDetail$ = this.eventService.GetEventDetail(eventDetail._id);
  }
}
