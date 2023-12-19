import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { EventDetail, EventDetailEventInfo, TicketTypeInfo } from 'src/app/models/event.models';
import { MusicModalComponent } from '../music-modal/music-modal.component';
import { EventService } from '../../../services/event.service';
import { CommonModule, NgOptimizedImage } from '@angular/common';

@Component({
  selector: 'app-music-item',
  templateUrl: './music-item.component.html',
  styleUrls: ['./music-item.component.scss'],
  standalone: true,
  imports: [CommonModule, NgOptimizedImage],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MusicItemComponent implements OnInit {
  @Input() eventDetail: EventDetail;
  @Input() usage: string;

  eventInfo: EventDetailEventInfo | undefined;
  comingSoon: boolean;
  imageUrl: string;
  imageDimension: number;

  constructor(private modalService: NgbModal) {
    this.imageDimension = 300;
  }

  ngOnInit(): void {
    this.eventInfo = this.eventDetail?.eventInfos?.find((p) => p.languageId === 0);
    this.comingSoon = this.eventDetail.start > new Date();
    this.imageUrl = this.getImageUrl(this.eventDetail);
  }
  openDetail(): void {
    const modalRef = this.modalService.open(MusicModalComponent, { size: 'lg' });
    modalRef.componentInstance.eventDetailId = this.eventDetail?._id;
  }
  private getImageUrl(eventDetail: EventDetail): string {
    const imageUrl = EventService.GetTicketTypeInfoFromEventDetail(eventDetail, 'CD')?.imageUrl;
    return `${imageUrl}?nf_resize=fit&w=${this.imageDimension}&h=${this.imageDimension}`;
  }
}
