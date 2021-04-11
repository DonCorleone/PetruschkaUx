import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {HomeRoutingModule} from './home-routing.module';
import {HomeComponent} from './home.component';
import {AboutItemComponent} from '../components/about/about-item/about-item.component';
import {AboutListComponent} from '../components/about/about-list/about-list.component';
import {AboutModalComponent} from '../components/about/about-modal/about-modal.component';
import {ContactComponent} from '../components/contact/contact.component';
import {FooterComponent} from '../components/footer/footer.component';
import {GigsItemComponent} from '../components/gigs/gigs-item/gigs-item.component';
import {GigsListComponent} from '../components/gigs/gigs-list/gigs-list.component';
import {HeaderComponent} from '../components/header/header.component';
import {InfoComponent} from '../components/info/info-item/info-item.component';
import {InfoModalComponent} from '../components/info/info-modal/info-modal.component';
import {LocationItemComponent} from '../components/location/location-item/location-item.component';
import {LocationModalComponent} from '../components/location/location-modal/location-modal.component';
import {MerchDetailComponent} from '../components/merch/merch-detail/merch-detail.component';
import {MerchItemComponent} from '../components/merch/merch-item/merch-item.component';
import {MerchListComponent} from '../components/merch/merch-list/merch-list.component';
import {MerchModalComponent} from '../components/merch/merch-modal/merch-modal.component';
import {MusicDetailComponent} from '../components/music/music-detail/music-detail.component';
import {MusicItemComponent} from '../components/music/music-item/music-item.component';
import {MusicListComponent} from '../components/music/music-list/music-list.component';
import {MusicModalComponent} from '../components/music/music-modal/music-modal.component';
import {PromoCarouselComponent} from '../components/promo/promo-carousel/promo-carousel.component';
import {PromoComponent} from '../components/promo/promo/promo.component';
import {CarouselUpdateComponent} from '../components/update/carousel-update/carousel-update.component';
import {UpdateSlideComponent} from '../components/update/update-slide/update-slide.component';
import { GalleryModalComponent } from '../components/gallery/gallery-modal/gallery-modal.component';;
import { HistoryListComponent } from '../components/history/history-list/history-list.component';
import { HistoryItemComponent } from '../components/history/history-item/history-item.component';
import {VideoComponent} from '../components/video/video.component';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { NgxMasonryModule } from 'ngx-masonry';


@NgModule({
	declarations: [
		HomeComponent,
		HeaderComponent,
		PromoComponent,
		GigsListComponent,
		MusicListComponent,
		AboutListComponent,
		MerchListComponent,
		ContactComponent,
		FooterComponent,
		VideoComponent,
		InfoComponent,
		GigsItemComponent,
		PromoCarouselComponent,
		CarouselUpdateComponent,
		UpdateSlideComponent,
		AboutItemComponent,
		MerchItemComponent,
		MusicItemComponent,
		// LayoutComponent,
		LocationItemComponent,
		InfoModalComponent,
		LocationModalComponent,
		AboutModalComponent,
		MerchModalComponent,
		MerchDetailComponent,
		MusicModalComponent,
		MusicDetailComponent,
		GalleryModalComponent,
		HistoryListComponent,
		HistoryItemComponent
	],
	imports: [
		CommonModule,
		HomeRoutingModule,
		NgbModule,
		NgxMasonryModule
	]
})
export class HomeModule {
}
