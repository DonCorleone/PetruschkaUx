import {Component, Input} from '@angular/core';
import {LoadingIndicatorService} from "../../services/loading-indicator.service";
import {animate, keyframes, style, transition, trigger} from "@angular/animations";

@Component({
  selector: 'app-loading-indicator',
  templateUrl: './loading-indicator.component.html',
  styleUrls: ['./loading-indicator.component.scss'],
	animations: [
		trigger('loadingRotate', [
			transition('void => *', [
				animate('1s', keyframes([
					style({ transform: 'rotate(0deg) scaleX(1)', offset: 0 }),
					style({ transform: 'rotate(90deg) scaleX(0.3)', offset: 0.25 }),
					style({ transform: 'rotate(180deg) scaleX(1)', offset: 0.5 }),
					style({ transform: 'rotate(270deg) scaleX(0.3)', offset: 0.75 }),
					style({ transform: 'rotate(360deg) scaleX(1)', offset: 1 })
				]))
			])
		])
	]
})
export class LoadingIndicatorComponent{

	@Input() title: string;
	constructor(private readonly loadingIndicatorService: LoadingIndicatorService) { }
	get loading$() {
		return this.loadingIndicatorService.loading$;
	}
}
