import { ChangeDetectionStrategy, Component, Input, OnChanges, OnDestroy } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { DomSanitizer } from '@angular/platform-browser';
import { Observable, Subject } from 'rxjs';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { EventDetailEventInfo } from 'src/app/models/event.models';
import { LocationModalComponent } from '../../location/location-modal/location-modal.component';
import { GalleryModalComponent } from '../../gallery/gallery-modal/gallery-modal.component';
import { ImagesService, Netlifile } from 'src/app/services/images.service';
import { map, takeUntil } from 'rxjs/operators';
import { Press, PressService } from 'src/app/services/press.service';
import { TicketModalComponent } from '../../ticket/ticket-modal/ticket-modal.component';
import { AboutModalComponent } from '../../../modules/about/about-modal/about-modal.component';
import { Job, StaffService } from '../../../services/staff.service';
import { environment } from '../../../../environments/environment';

@Component({
  selector: 'app-info-item',
  templateUrl: './info-item.component.html',
  styleUrls: ['./info-item.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InfoComponent implements OnChanges, OnDestroy {
  @Input() eventInfo: EventDetailEventInfo;
  @Input() eventInfoDe: EventDetailEventInfo;
  @Input() eventId: number;
  @Input() reservationMail: string;
  @Input() usage: string;
  @Input() tag: string;
  @Input() playDate: Date;
  @Input() eventKey: string;

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

    //  this.image4Images$ = this.imageService.getAlbum(this.eventKey).pipe(map((p) => p.files));
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
    modalRef.componentInstance.files$ = this.files$;
  }

  openTicket(): void {
    if (this.tag === 'sold-out') {
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
      return this.eventInfoDe ? this.eventInfoDe?.url + this.eventId : '';
    } else {
      return this.eventInfoDe?.url;
    }
  }

  ngOnDestroy() {
    this._ngDestroy$.next();
    this._ngDestroy$.complete();
  }
}
