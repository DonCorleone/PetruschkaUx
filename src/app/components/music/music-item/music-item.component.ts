import { Component, Input, OnInit } from '@angular/core';
import { EventDetail } from 'src/app/models/event.models';

@Component({
  selector: 'app-music-item',
  templateUrl: './music-item.component.html',
  styleUrls: ['./music-item.component.scss']
})
export class MusicItemComponent implements OnInit {

  @Input() eventDetail: EventDetail;
  @Input() usage: string;

  get comingSoon(): boolean {
    return (this.eventDetail && this.eventDetail.start && this.eventDetail.start > new Date() ? true : false);
  }

  get name():string {
    return (this.eventDetail && this.eventDetail.eventInfos[0]) ? this.eventDetail.eventInfos[0].name: null;
  }

  constructor() { }

  ngOnInit(): void {
  }
}
