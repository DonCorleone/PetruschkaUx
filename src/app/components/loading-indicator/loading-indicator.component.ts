import { Component, Input, ViewEncapsulation } from '@angular/core';
import { LoadingIndicatorService } from '../../services/loading-indicator.service';
import { CommonModule } from '@angular/common';
import { animate, keyframes, style, transition, trigger } from '@angular/animations';

@Component({
  selector: 'app-loading-indicator',
  templateUrl: './loading-indicator.component.html',
  styleUrls: ['./loading-indicator.component.scss'],
  encapsulation: ViewEncapsulation.None,
  standalone: true,
  imports: [CommonModule],
  animations: [
    trigger('loadingRotate', [
      transition('* => *', [
        animate(
          '1s',
          keyframes([
            style({ rotate: '0deg', transform: 'scaleX(1)', offset: 0 }),
            style({ rotate: '90deg', transform: 'scaleX(0.3)', offset: 0.25 }),
            style({ rotate: '180deg', transform: 'scaleX(1)', offset: 0.5 }),
            style({ rotate: '270deg', transform: 'scaleX(0.3)', offset: 0.75 }),
            style({ rotate: '360deg', transform: 'scaleX(1)', offset: 1 }),
          ])
        ),
      ]),
    ]),
  ],
})
export class LoadingIndicatorComponent {
  @Input() title: string;
  constructor(private readonly loadingIndicatorService: LoadingIndicatorService) {}
  get loading$() {
    return this.loadingIndicatorService.loading$;
  }
}
