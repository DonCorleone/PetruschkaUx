import { Component, Input, OnInit } from '@angular/core';
import { Console } from 'node:console';
import { Observable } from 'rxjs';
import { EventDetail } from 'src/app/models/event.models';
import { Sponsor } from 'src/app/models/sponsors.models';
import { SponsorsService } from 'src/app/services/sponsors.service';

@Component({
  selector: 'app-sponsors',
  templateUrl: './sponsors.component.html',
  styleUrls: ['./sponsors.component.scss']
})
export class SponsorsComponent implements OnInit {

	@Input() eventKey:String;

 	getShare(sponsor:Sponsor): Number{
		console.log('EventKey: ' + this.eventKey);
		console.log(sponsor);
		console.log(sponsor.events);
		return sponsor?.events.find(p => p.event === this.eventKey)?.share;
	}
  constructor(private sponsorsService:SponsorsService) { }

	sponsors$:Observable<Sponsor[]>;
  ngOnInit(): void {
		this.sponsors$ = this.sponsorsService.GetSponsors(this.eventKey);
  }
}
