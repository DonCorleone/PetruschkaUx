import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { MerchModalComponent } from '../merch-modal/merch-modal.component';
import { EventDetail, EventDetailEventInfo } from '../../../models/event.models';
import { EventService } from '../../../services/event.service';
import { NgIf, NgOptimizedImage } from '@angular/common';

@Component({
  selector: 'app-merch-item',
  templateUrl: './merch-item.component.html',
  styleUrls: ['./merch-item.component.scss'],
  standalone: true,
  imports: [NgOptimizedImage, NgIf],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MerchItemComponent implements OnInit {
  @Input() eventDetail: EventDetail;
  @Input() usage: string;

  eventInfo: EventDetailEventInfo | undefined;
  imageUrl: string;

  imageDimension: number;

  constructor(private modalService: NgbModal) {
    this.imageDimension = 300;
  }

  getImageUrl(eventDetail: EventDetail): string {
    const imageUrl = EventService.GetTicketTypeInfoFromEventDetail(eventDetail, 'Tournee')?.imageUrl;
    return `${imageUrl}?nf_resize=smartcrop&w=${this.imageDimension}&h=${this.imageDimension}`;
  }

  openDetail(): void {
    const modalRef = this.modalService.open(MerchModalComponent, { size: 'lg' });
    modalRef.componentInstance.eventDetailId = this.eventDetail?._id;
  }

  ngOnInit(): void {
    this.eventInfo = this.eventDetail?.eventInfos?.find((p) => p.languageId === 0);
    this.imageUrl = this.getImageUrl(this.eventDetail);
  }
}
