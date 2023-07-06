import { Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { SponsorsService } from 'src/app/services/sponsors.service';
import { environment } from '../../../environments/environment';
import { Sponsor } from '../../models/sponsors.models';

@Component({
  selector: 'app-sponsors',
  templateUrl: './sponsors.component.html',
  styleUrls: ['./sponsors.component.scss'],
})
export class SponsorsComponent implements OnInit {
  @Input() eventKey: String;
  private imageUrl: string;

  getShare(sponsor: Sponsor): Number {
    return sponsor?.events.find((p) => p.event === this.eventKey)?.share;
  }
  constructor(private sponsorsService: SponsorsService) {}

  sponsors$: Observable<Sponsor[]>;

  ngOnInit(): void {
    this.imageUrl = environment.URL;
    this.sponsors$ = this.sponsorsService.GetSponsors(this.eventKey);
  }

  getImagePath(sponsor: Sponsor): string {
		// calculate height of image based on share
		const share = sponsor.events.find(p => p.event == this.eventKey).share;
		const heightInt = Math.round(share * 480);
		return `https://www.petruschka.ch/assets/images/sponsoren/sponsors_${sponsor.image}?nf_resize=fit&h=${heightInt}`;
  }
}
