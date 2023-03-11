import { ChangeDetectionStrategy, Component, Input, OnDestroy, OnInit } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { Observable, Subject } from 'rxjs';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { EventDetailEventInfo, TicketPrice, TicketTypeInfo } from 'src/app/models/event.models';
import { LocationModalComponent } from '../../location/location-modal/location-modal.component';
import { GalleryModalComponent } from '../../gallery/gallery-modal/gallery-modal.component';
import { ImagesService, Netlifile } from 'src/app/services/images.service';
import { map, takeUntil } from 'rxjs/operators';
import { PressService } from 'src/app/services/press.service';
import { TicketModalComponent } from '../../ticket/ticket-modal/ticket-modal.component';
import { AboutModalComponent } from '../../../modules/about/about-modal/about-modal.component';
import { StaffService } from '../../../services/staff.service';
import { environment } from '../../../../environments/environment';
import { Job } from '../../../models/staff.models';
import { LocationIdName } from 'src/app/models/location.models';

@Component({
  selector: 'app-info-item',
  templateUrl: './info-item.component.html',
  styleUrls: ['./info-item.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InfoComponent implements OnInit, OnDestroy {
  @Input() eventInfo: EventDetailEventInfo;
  @Input() eventInfoDe: EventDetailEventInfo;
  @Input() eventTicketDesc: TicketTypeInfo;
  @Input() ticketPrices: TicketPrice[];
  @Input() eventId: number;
  @Input() reservationMail: string;
  @Input() usage: string;
  @Input() tag: string;
  @Input() playDate: Date;
  @Input() eventKey: string;
  @Input() ef_locationId?: number;

  artistsArray: Job[];
  files$: Observable<Netlifile[]>;
  pressArticle$ = this.pressService.pressArticles$.pipe(
    map((result) => result.find((article) => article.nr === this.eventKey))
  );

  @Input() preSaleStart: Date;

  private _ngDestroy$ = new Subject<void>();

  constructor(
    private sanitizer: DomSanitizer,
    private modalService: NgbModal,
    private imageService: ImagesService,
    private pressService: PressService,
    private breakpointObserver: BreakpointObserver
  ) {}

  ngOnInit(): void {
    if (this.eventInfo && this.eventInfo.artists) {
      this.artistsArray = StaffService.GetStaffLinks(this.eventInfo.artists);
    }
    this.breakpointObserver
      .observe([Breakpoints.XSmall, Breakpoints.Small, Breakpoints.Medium, Breakpoints.Large, Breakpoints.XLarge])
      .pipe(takeUntil(this._ngDestroy$))
      .subscribe((result) => {
        for (const query of Object.keys(result.breakpoints)) {
          if (result.breakpoints[query]) {
            const match = query.match('\\(max-width:\\s(\\d+)\\.98px\\)');
            const width = match?.length ? match[1] : '2048';

            this.files$ = this.imageService.listAssets('/assets/images/impressionen/' + this.eventKey).pipe(
              map((p) => {
                p.forEach((image) => (image.path = `${environment.URL}${image.path}`));
                return p;
              })
            );
            break;
          }
        }
      });
  }

  get showBuyButton(): boolean {
    return new Date(this.preSaleStart) <= new Date() && new Date(this.playDate) >= new Date();
  }

  get locationIdName(): LocationIdName {
    return {
      ef_id: this.ef_locationId,
      name: this.eventInfo.location,
    };
  }

	get bannerImagePath(): string {
		const imageUrl = this.eventInfo?.bannerImagePath;
		return imageUrl ? imageUrl + '?nf_resize=smartcrop&w=766&h=400' : '';
	}

  get name() {
    return this.eventInfo && this.eventInfo.name ? this.eventInfo.name : null;
  }

  get plot(): SafeHtml {
    return this.eventInfo && this.eventInfo.longDescription ? this.transformHtml(this.eventInfo.longDescription) : null;
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

  openStaff(staffName: string) {
    const modalRef = this.modalService.open(AboutModalComponent, { size: 'sm' });
    modalRef.componentInstance.staffName = staffName;
  }

  openLocation() {
    const modalRef = this.modalService.open(LocationModalComponent, { size: 'lg' });
    modalRef.componentInstance.eventLocationIdName = this.locationIdName;
  }

  transformHtml(htmlTextWithStyle) {
    return this.sanitizer.bypassSecurityTrustHtml(htmlTextWithStyle);
  }

  openGallery(): void {
    const modalRef = this.modalService.open(GalleryModalComponent, { size: 'xl' });
    modalRef.componentInstance.files$ = this.files$;
  }

  openTicket(): void {
    if (this.tag === 'sold-out') {
      return;
    }
    var eventLink = this.eventLink;
    if (eventLink == 'modal') {
      const modalRef = this.modalService.open(TicketModalComponent, { size: 'md' });
      modalRef.componentInstance.ticketPrices = this.ticketPrices;
    } else {
      window.open(eventLink, '_blank');
    }
  }
  get eventLink() {
    if (this.eventInfoDe?.url?.includes('petruschka.ch')) {
      return 'modal';
    } else if (this.eventInfoDe?.url?.includes('ticketino.com')) {
      return this.eventInfoDe ? this.eventInfoDe?.url + this.eventId : '';
    } else {
      return this.eventInfoDe?.url;
    }
  }

  ngOnDestroy() {
    this._ngDestroy$.next();
    this._ngDestroy$.complete();
    // this.breakpointObserver.ngOnDestroy();
  }
}
