import { Component, Input, OnInit } from '@angular/core';
import { EventDetail } from 'src/app/models/event.models';

@Component({
  selector: 'app-merch-item',
  templateUrl: './merch-item.component.html',
  styleUrls: ['./merch-item.component.scss']
})
export class MerchItemComponent implements OnInit {

  get name() {
    return (this.eventDetail && this.eventDetail.eventInfos[0]) ? this.eventDetail.eventInfos[0].name: null;
  }

  @Input() eventDetail: EventDetail;
  @Input() usage: string;

  constructor() { }

  ngOnInit(): void {
  }

}
