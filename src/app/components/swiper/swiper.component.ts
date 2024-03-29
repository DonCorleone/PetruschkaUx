import {
  AfterViewInit,
  CUSTOM_ELEMENTS_SCHEMA,
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  Input,
  OnInit,
  ViewChild,
  ViewEncapsulation,
} from '@angular/core';
import { ImagesService, Netlifile } from 'src/app/services/images.service';
import { EMPTY, Observable, map, toArray, take, from } from 'rxjs';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { CommonModule } from '@angular/common';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-swiper',
  standalone: true,
  encapsulation: ViewEncapsulation.None,
  imports: [CommonModule],
  templateUrl: './swiper.component.html',
  styleUrls: ['./swiper.component.scss'],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SwiperComponent implements OnInit, AfterViewInit {
  @Input() files: Netlifile[];

  files$: Observable<Netlifile[]> = EMPTY;

  @ViewChild('swiper-container') swiperContainer!: ElementRef;
  query: string;

  constructor(private imageService: ImagesService, private breakpointObserver: BreakpointObserver) {}
  ngOnInit(): void {
    this.breakpointObserver
      .observe([Breakpoints.XSmall, Breakpoints.Small, Breakpoints.Medium, Breakpoints.Large, Breakpoints.XLarge])
      .pipe(take(1))
      .subscribe((result) => {
        for (const query of Object.keys(result.breakpoints)) {
          if (result.breakpoints[query]) {
            this.query = query;
            const match = query.match('\\(max-width:\\s(\\d+)\\.98px\\)');
            const width = match?.length ? match[1] : '2048';
            const url = `https://${environment.SITE_NAME}.netlify.app`;

            this.files$ = this.transformFiles(this.files, url, width);
          }
        }
      });
  }
  transformFiles(files: Netlifile[], url: string, width: string): Observable<Netlifile[]> {
    return from(files).pipe(
      map((file) => {
        const assetsIndex = file.path.lastIndexOf('/assets');
        const path = assetsIndex !== -1 ? file.path.substring(assetsIndex) : file.path;

        const widthOffset = Math.round(+width * 0.7);
        const height = Math.round((9 / 16) * widthOffset);
        file.url = `${url}${path}?nf_resize=fit&w=${widthOffset}`;
        return file;
      }),
      toArray() // Collect the mapped files into an array
    );
  }

  ngAfterViewInit(): void {
    this.files$.pipe(take(1)).subscribe((p) => {
      // swiper parameters
      const swiperParams = {
        pagination: {
          el: '.swiper-pagination',
          clickable: true,
        },
        navigation: {
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev',
        },
        spaceBetween: 30,
      };

      const swiperEl: any = document.querySelector('swiper-container');

      Object.assign(swiperEl, swiperParams);
      // const swiper = new Swiper(this.swiperContainer.nativeElement, swiperParams);
      swiperEl.initialize();
    });
  }
}
