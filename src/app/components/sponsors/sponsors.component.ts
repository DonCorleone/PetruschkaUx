import { Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Sponsor } from 'src/app/models/sponsors.models';
import { SponsorsService } from 'src/app/services/sponsors.service';
import {environment} from "../../../environments/environment";

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

	getImagePath(imageName: string): string {
		return `${this.imageUrl}/assets/images/sponsoren/sponsors_${imageName}`
	}
}
