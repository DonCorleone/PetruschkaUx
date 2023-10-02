import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { EventDetail } from 'src/app/models/event.models';
import { EventService } from 'src/app/services/event.service';
import { MerchItemComponent } from '../merch-item/merch-item.component';
import { LoadingIndicatorComponent } from "../../loading-indicator/loading-indicator.component";
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-merch-list',
    templateUrl: './merch-list.component.html',
    styleUrls: ['./merch-list.component.scss'],
    standalone: true,
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [CommonModule, MerchItemComponent, LoadingIndicatorComponent]
})
export class MerchListComponent implements OnInit {
  eventDetailsTournee$: Observable<EventDetail[]>;

  constructor(private eventService: EventService) {}

  ngOnInit() {
    this.eventDetailsTournee$ = this.eventService.GetEventDetails((p) => p.googleAnalyticsTracker.includes('Tournee'));
  }

  get LogoWanderTheater(): string {
    let imageUrl = 'https://petruschka.netlify.app/' + 'assets/images/' + encodeURIComponent('logo-wandertheater.png');
    return 'https://images.weserv.nl/?url=' + imageUrl + '&w=444&h=126';
  }
}
