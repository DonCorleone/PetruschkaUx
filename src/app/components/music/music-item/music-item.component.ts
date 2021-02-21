import { Component, Input, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { EventDetail } from 'src/app/models/event.models';
import { EventService } from 'src/app/services/event.service';
import { MusicModalComponent } from '../music-modal/music-modal.component';

@Component({
  selector: 'app-music-item',
  templateUrl: './music-item.component.html',
  styleUrls: ['./music-item.component.scss']
})
export class MusicItemComponent implements OnInit {

  @Input() eventDetail: EventDetail;

  get comingSoon(): boolean {
    return (this.eventDetail && this.eventDetail.start && this.eventDetail.start > new Date() ? true : false);
  }

  get name(): string {
    return (this.eventDetail && this.eventDetail.eventInfos[0]) ? this.eventDetail.eventInfos[0].name: null;
  }

  get imagePath(): string {
    return EventService.GetPicSqrPathFromEventDetail(this.eventDetail);
  }

  constructor(private modalService: NgbModal) { }

  ngOnInit(): void {
  }

  openDetail():void  {
    const modalRef = this.modalService.open(MusicModalComponent);
    modalRef.componentInstance.eventDetail = this.eventDetail;
  }
}
