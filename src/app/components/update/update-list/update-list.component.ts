import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';
import { EventDetailViewModel } from 'src/app/models/event.models';
import { EventService } from 'src/app/services/event.service';

@Component({
  selector: 'app-update-list',
  templateUrl: './update-list.component.html',
  styleUrls: ['./update-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UpdateListComponent implements OnInit {
  @Input() dateGte: Date;
  @Input() dateLt: Date;
  @Input() usage: string;

  @Output() hasData: EventEmitter<boolean> = new EventEmitter();

  eventDetails$: Observable<EventDetailViewModel[]>;

  constructor(private eventService: EventService) {}

  ngOnInit() {
    if (this.usage === 'history') {
      this.eventDetails$ = this.eventService.pastEventDetails$;
    } else {
      this.eventDetails$ = this.eventService.upcomingEventDetails$;
    }
    this.eventDetails$.pipe(take(1)).subscribe((value) => this.hasData.emit(value.length > 0));
  }
}
