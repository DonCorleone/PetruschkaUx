import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import { take } from 'rxjs/operators';
import { EventDetailViewModel } from 'src/app/models/event.models';
import { EventService } from 'src/app/services/event.service';
import { UpdateSlideComponent } from "../update-slide/update-slide.component";
import { NgForOf } from '@angular/common';

@Component({
    selector: 'app-update-list',
    templateUrl: './update-list.component.html',
    styleUrls: ['./update-list.component.scss'],
    standalone: true,
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [UpdateSlideComponent, NgForOf]
})
export class UpdateListComponent implements OnInit {
  @Input() dateGte: Date;
  @Input() dateLt: Date;
  @Input() usage: string;

  @Output() hasData: EventEmitter<boolean> = new EventEmitter();

  eventDetails: EventDetailViewModel[];

  constructor(private eventService: EventService, private cdr: ChangeDetectorRef) {}

  ngOnInit() {
    if (this.usage === 'history') {
      this.eventService.pastEventDetails$.pipe(take(1)).subscribe((value) => {
        this.eventDetails = value;
        this.cdr.markForCheck();
        this.hasData.emit(value.length > 0);
      });
    } else {
      this.eventService.upcomingEventDetails$.pipe(take(1)).subscribe((value) => {
        this.eventDetails = value;
        this.cdr.markForCheck();
        this.hasData.emit(value.length > 0);
      });
    }
    //  this.eventDetails$.pipe(take(1)).subscribe((value) => this.hasData.emit(value.length > 0));
  }
}
