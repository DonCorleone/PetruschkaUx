import { Component, Input, ViewEncapsulation } from '@angular/core';
import { LoadingIndicatorService } from '../../services/loading-indicator.service';
import { animate, keyframes, style, transition, trigger } from '@angular/animations';

@Component({
  selector: 'app-loading-indicator',
  templateUrl: './loading-indicator.component.html',
  styleUrls: ['./loading-indicator.component.scss'],
  encapsulation: ViewEncapsulation.None
})
  export class LoadingIndicatorComponent {
  @Input() title: string;
  constructor(private readonly loadingIndicatorService: LoadingIndicatorService) {}
  get loading$() {
    return this.loadingIndicatorService.loading$;
  }
}
