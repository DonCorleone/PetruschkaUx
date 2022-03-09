import { ChangeDetectionStrategy, Component, Input, OnChanges } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Observable } from 'rxjs';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { EventDetailEventInfo } from 'src/app/models/event.models';
import { LocationModalComponent } from '../../location/location-modal/location-modal.component';
import { Job } from '../../../models/staff.models';
import { GalleryModalComponent } from '../../gallery/gallery-modal/gallery-modal.component';
import { ImagesService, File } from 'src/app/services/images.service';
import { map } from 'rxjs/operators';
import { Press, PressService } from 'src/app/services/press.service';
import { TicketModalComponent } from '../../ticket/ticket-modal/ticket-modal.component';
import { AboutModalComponent } from '../../../modules/about/about-modal/about-modal.component';
import {StaffService} from "../../../services/staff.service";

@Component({
  selector: 'app-info-item',
  templateUrl: './info-item.component.html',
  styleUrls: ['./info-item.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InfoComponent implements OnChanges {
  @Input() eventInfo: EventDetailEventInfo;
  @Input() eventInfoDe: EventDetailEventInfo;
  @Input() eventId: number;
  @Input() reservationMail: string;
  @Input() usage: string;
	@Input() tag: string;
  @Input() playDate: Date;
  @Input() eventKey: string;

  artistsArray: Job[];
  image4Images$: Observable<File[]>;
  pressArticle$: Observable<Press>;
  @Input() preSaleStart: Date;

  constructor(
    private sanitizer: DomSanitizer,
    private modalService: NgbModal,
    private imageService: ImagesService,
    private pressService: PressService
  ) {}

  get showBuyButton(): boolean {
    return new Date(this.preSaleStart) <= new Date() && new Date(this.playDate) >= new Date();
  }

  get locationName(): string {
    return this.eventInfo && this.eventInfo.location ? this.eventInfo.location : null;
  }

  get artists(): Job[] {
    return this.artistsArray && this.artistsArray.length > 0 ? this.artistsArray : null;
  }

  get name() {
    return this.eventInfo && this.eventInfo.name ? this.eventInfo.name : null;
  }

  get shortDesc(): string {
    return this.eventInfo && this.eventInfo.shortDescription ? this.eventInfo.shortDescription : null;
  }

  get plot() {
    return this.eventInfo && this.eventInfo.longDescription ? this.transformHtml(this.eventInfo.longDescription) : null;
  }

  get flyerImagePath(): string {
    return this.eventInfo && this.eventInfo.flyerImagePath ? this.eventInfo.flyerImagePath : null;
  }

  get bannerImagePath(): string {
    return this.eventInfo && this.eventInfo.bannerImagePath ? this.eventInfo.bannerImagePath : null;
  }

  get locationLabel(): string {
    if (this.usage === 'Premiere') {
      return 'Spielstätte';
    } else {
      return `Das Stück ${this.isFutureEvent ? 'wird' : 'wurde'} aufgeführt im`;
    }
  }

  get isFutureEvent(): boolean {
    return new Date(this.playDate) > new Date();
  }

  get playDateLabel(): string {
    if (this.usage === 'Premiere') {
      return 'Premiere';
    } else if (this.usage === 'CD' || this.usage === 'Tournee') {
      return `Urauführung`;
    } else {
      return `Das Stück ${this.isFutureEvent ? 'wird aufgeführt' : 'wurde uraufgeführt'} am`;
    }
  }

  ngOnChanges(): void {
    if (this.eventInfo && this.eventInfo.artists) {
      this.artistsArray = StaffService.GetStaffLinks(this.eventInfo.artists);
    }
    this.image4Images$ = this.imageService.getAlbum(this.eventKey).pipe(map((p) => p.files));

    this.pressArticle$ = this.pressService
      .GetPressArticles()
      .pipe(map((result) => result.find((article) => article.nr === this.eventKey)));
  }

  openStaff(staffName: string) {
    const modalRef = this.modalService.open(AboutModalComponent, { size: 'sm' });
    modalRef.componentInstance.staffName = staffName;
  }

  openLocation(locationName: string) {
    const modalRef = this.modalService.open(LocationModalComponent, { size: 'lg' });
    modalRef.componentInstance.eventLocationName = locationName;
  }

  transformHtml(htmlTextWithStyle) {
    return this.sanitizer.bypassSecurityTrustHtml(htmlTextWithStyle);
  }

  openGallery(): void {
    const modalRef = this.modalService.open(GalleryModalComponent, { size: 'xl' });
    modalRef.componentInstance.image4Images = this.image4Images$;
  }

  openTicket(): void {
		if (this.tag === 'sold-out'){
			return;
		}
    var eventLink = this.eventLink;
    if (eventLink == 'modal') {
      const modalRef = this.modalService.open(TicketModalComponent, { size: 'md' });
    } else {
      window.open(eventLink, '_blank');
    }
  }
  get eventLink() {
    if (this.eventInfoDe?.url?.includes('petruschka.ch')) {
      return 'modal';
    } else if (this.eventInfoDe?.url?.includes('ticketino.com')) {
      return this.eventInfoDe ? 'https://www.ticketino.com/de/Event/' + this.eventInfoDe.name + '/' + this.eventId : '';
    } else {
      return this.eventInfoDe?.url;
    }
  }
}
