import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';

@Component({
	selector: 'app-video',
	templateUrl: './video.component.html',
	styleUrls: ['./video.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class VideoComponent {}
