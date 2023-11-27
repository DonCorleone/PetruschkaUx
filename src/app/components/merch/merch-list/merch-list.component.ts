import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { EventDetail } from 'src/app/models/event.models';
import { EventService } from 'src/app/services/event.service';
import { MerchItemComponent } from '../merch-item/merch-item.component';
import { LoadingIndicatorComponent } from '../../loading-indicator/loading-indicator.component';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { trigger, state, style, transition, animate } from '@angular/animations';

@Component({
  selector: 'app-merch-list',
  templateUrl: './merch-list.component.html',
  styleUrls: ['./merch-list.component.scss'],
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule, MerchItemComponent, LoadingIndicatorComponent, NgOptimizedImage],
  animations: [
    trigger('flyTopDown', [
      state('in', style({ transform: 'translateY(0)' })),
      transition('void => *', [style({ transform: 'translateY(-200px)' }), animate(300)]),
    ]),
  ],
})
export class MerchListComponent implements OnInit {
  eventDetailsTournee$: Observable<EventDetail[]>;

  constructor(private eventService: EventService) {}

  ngOnInit() {
    this.eventDetailsTournee$ = this.eventService.GetEventDetailsTournee();
  }

  get LogoWanderTheater(): string {
    let imageUrl = 'https://petruschka.netlify.app/' + 'assets/images/' + encodeURIComponent('logo-wandertheater.png');
    return 'https://images.weserv.nl/?url=' + imageUrl + '&w=444&h=126';
  }
}
