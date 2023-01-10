import {Component, Input} from '@angular/core';
import {LoadingIndicatorService} from "../../services/loading-indicator.service";

@Component({
  selector: 'app-loading-indicator',
  templateUrl: './loading-indicator.component.html',
  styleUrls: ['./loading-indicator.component.scss']
})
export class LoadingIndicatorComponent{

	@Input() title: string;
	constructor(private readonly loadingIndicatorService: LoadingIndicatorService) { }
	get loading$() {
		return this.loadingIndicatorService.loading$;
	}
}
