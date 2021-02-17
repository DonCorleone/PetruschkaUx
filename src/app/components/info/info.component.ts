import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { EventDetail, EventDetailEventInfo } from 'src/app/models/event.models';
import { LocationModalComponent } from '../location/location-modal/location-modal.component';

interface job {
  name: string,
  jobsharers: string[]
}

@Component({
  selector: 'app-info',
  templateUrl: './info.component.html',
  styleUrls: ['./info.component.scss']
})
export class InfoComponent implements OnChanges{

  @Input() eventInfo: EventDetailEventInfo;
  @Input() reservationMail: string;

  artistsArray: job[];
  private usageProp:string;

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

  get shortDesc() : string {
    return (this.eventInfo && this.eventInfo.shortDescription) ? this.eventInfo.shortDescription : null;
  }

  get plot() {
    return (this.eventInfo && this.eventInfo.longDescription) ? this.transformHtml(this.eventInfo.longDescription) : null;
  }

  get flyerImagePath() : string {
    return (this.eventInfo && this.eventInfo.bannerImagePath) ? this.eventInfo.bannerImagePath : null;
  }

  get usage(): string {
    return this.usageProp;
  }

  get locationLabel (): string{
    if (this.usage == "Premiere") {
      return "Spielstätte";
    } else {
      return "Das Stück wurde aufgeführt im";
    }
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
