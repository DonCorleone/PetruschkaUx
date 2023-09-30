import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeComponent } from './home.component';
import { PromoComponent } from '../../components/promo/promo/promo.component';
import { MerchModalComponent } from '../../components/merch/merch-modal/merch-modal.component';
import { MusicModalComponent } from '../../components/music/music-modal/music-modal.component';
import { LocationModalComponent } from '../../components/location/location-modal/location-modal.component';
import { GalleryModalComponent } from '../../components/gallery/gallery-modal/gallery-modal.component';
import { MusicDetailComponent } from '../../components/music/music-detail/music-detail.component';
import { LocationItemComponent } from '../../components/location/location-item/location-item.component';
import { VideoComponent } from '../../components/video/video.component';
import { InfoModalComponent } from '../../components/info/info-modal/info-modal.component';
import { MerchDetailComponent } from '../../components/merch/merch-detail/merch-detail.component';
import { InfoComponent } from '../../components/info/info-item/info-item.component';
import { PromoCarouselComponent } from '../../components/promo/promo-carousel/promo-carousel.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { SharedModule } from '../shared/shared.module';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [{ path: '', component: HomeComponent}];

@NgModule({
	declarations: [
		HomeComponent,
		PromoComponent,
		VideoComponent,
		InfoComponent,
		PromoCarouselComponent,
		LocationItemComponent,
		InfoModalComponent,
		LocationModalComponent,
		MerchModalComponent,
		MerchDetailComponent,
		MusicModalComponent,
		MusicDetailComponent,
		GalleryModalComponent,
	],
	imports: [CommonModule, SharedModule, RouterModule.forChild(routes), NgbModule],
})
export class HomeModule {}
