import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { EventDetail, EventDetailEventInfo } from 'src/app/models/event.models';
import { AboutModalComponent } from '../../about/about-modal/about-modal.component';
import { LocationModalComponent } from '../../location/location-modal/location-modal.component';

interface job {
  name: string,
  jobsharers: string[]
}

@Component({
  selector: 'app-info-item',
  templateUrl: './info-item.component.html',
  styleUrls: ['./info-item.component.scss']
})
export class InfoComponent implements OnChanges{

  @Input() eventInfo: EventDetailEventInfo;
  @Input() reservationMail: string;
  @Input() usage: string;
  @Input() playDate: Date;


  artistsArray: job[];

  constructor(
    private sanitizer: DomSanitizer, private modalService: NgbModal ) { }

  ngOnChanges(): void {
    if (this.eventInfo && this.eventInfo.artists){
      this.artistsArray = this.GetStaffLinks(this.eventInfo.artists);
    }
  }

  get locationName() : string {
    return (this.eventInfo && this.eventInfo.location) ? this.eventInfo.location : null;
  }

  get artists() : job[] {
    return (this.artistsArray && this.artistsArray.length > 0) ? this.artistsArray : null;
  }

  get name() {
    return (this.eventInfo && this.eventInfo.name) ? this.eventInfo.name : null;
  }

  get shortDesc() : string {
    return (this.eventInfo && this.eventInfo.shortDescription) ? this.eventInfo.shortDescription : null;
  }

  get plot() {
    return (this.eventInfo && this.eventInfo.longDescription) ? this.transformHtml(this.eventInfo.longDescription) : null;
  }

  get flyerImagePath() : string {
    return (this.eventInfo && this.eventInfo.bannerImagePath) ? this.eventInfo.bannerImagePath : null;
  }

  get locationLabel (): string{
    if (this.usage == "Premiere") {
      return "Spielstätte";
    } else {
      return `Das Stück ${ this.isFutureEvent ?  'wird' : 'wurde' } aufgeführt im`;
    }
  }

  get isFutureEvent(): Boolean{
    return new Date(this.playDate) > new Date();
  }

  get playDateLabel (): string{
    if (this.usage == "Premiere") {
      return "Premiere";
    } else if (this.usage == "CD" || this.usage == "Tournee" ) {
      return `Urauführung`;
    } else {
      return `Das Stück ${ this.isFutureEvent ? 'wird' : 'wurde' } aufgeführt am`;
    }
  }

  openStaff(staffName:string) {
    const modalRef = this.modalService.open(AboutModalComponent);
    modalRef.componentInstance.staffName = staffName;
  }

  openLocation(locationName:string) {
    const modalRef = this.modalService.open(LocationModalComponent);
    modalRef.componentInstance.eventLocationName = locationName;
  }

  transformHtml(htmlTextWithStyle) {
    return this.sanitizer.bypassSecurityTrustHtml(htmlTextWithStyle);
  }

  GetStaffLinks(staff: string): job [] {

    let jobs = staff.split('|');
    let returnval: job [] = [];

    jobs.forEach(job => {
    let ixOfSplitter = job.indexOf(':');

      let jobsharerArray: string[] = [];

      let jobdesc: string = job.slice(0, ixOfSplitter);
      let jobsharers = job.substring(ixOfSplitter + 1).split('&');

      jobsharers.forEach(jobsharePartner => {

        jobsharerArray.push(jobsharePartner.trim());
      });

      var jobObject: job = {
        name: jobdesc.trim(),
        jobsharers: jobsharerArray
      }

      returnval.push(jobObject)
    });

    return returnval;
  }
}
