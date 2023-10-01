import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { SponsorsService } from 'src/app/services/sponsors.service';
import { environment } from '../../../environments/environment';
import { SponsorExtended } from '../../models/sponsors.models';
import { map } from 'rxjs/operators';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-sponsors',
  templateUrl: './sponsors.component.html',
  styleUrls: ['./sponsors.component.scss'],
  standalone: true,
  imports: [CommonModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SponsorsComponent implements OnInit {
  @Input() eventKey: String;

  constructor(private sponsorsService: SponsorsService) {}

  sponsors$: Observable<SponsorExtended[]>;

  ngOnInit(): void {
    const url = environment.URL;
    this.sponsors$ = this.sponsorsService.GetSponsors(this.eventKey).pipe(
      map((sponsors) =>
        sponsors.map((sponsor) => {
          const currentEvent = sponsor.events.find((p) => p.event == this.eventKey);
          const share = currentEvent ? currentEvent.share : 0.1; // find the event with the current eventKey
          const heightInt = Math.round(share * 480); // calculate height of image based on share
          const imagePath = url + `/assets/images/sponsoren/sponsors_${sponsor.image}?nf_resize=fit&h=${heightInt}`;
          return {
            ...sponsor,
            share: share,
            imagePath: imagePath,
          };
        })
      )
    );
  }
}
