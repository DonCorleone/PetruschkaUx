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

  eventDetails: EventDetailViewModel[];

  constructor(private eventService: EventService) {}

  ngOnInit() {
    if (this.usage === 'history') {
      this.eventService.pastEventDetails$.pipe(take(1)).subscribe((value) => {
        this.hasData.emit(value.length > 0);
        this.eventDetails = value;
      });
    } else {
      this.eventService.upcomingEventDetails$.pipe(take(1)).subscribe((value) => {
        this.hasData.emit(value.length > 0);
        this.eventDetails = value;
      });
    }
    //  this.eventDetails$.pipe(take(1)).subscribe((value) => this.hasData.emit(value.length > 0));
  }
}
