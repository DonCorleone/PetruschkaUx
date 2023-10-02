import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {Observable} from 'rxjs';
import {EventDetail, EventDetailEventInfo} from 'src/app/models/event.models';
import {EventService} from 'src/app/services/event.service';
import { LoadingIndicatorComponent } from "../../loading-indicator/loading-indicator.component";
import { MusicItemComponent } from '../music-item/music-item.component';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-music-list',
    templateUrl: './music-list.component.html',
    styleUrls: ['./music-list.component.scss'],
    standalone: true,
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [CommonModule, LoadingIndicatorComponent, MusicItemComponent]
})
export class MusicListComponent implements OnInit {

	eventDetailsCD$: Observable<EventDetail[]>;

	constructor(private eventService: EventService) {
	}

	ngOnInit() {
		this.eventDetailsCD$ = this.eventService.GetEventDetails(
			p => p.googleAnalyticsTracker.includes('CD')
		);
	}
}
