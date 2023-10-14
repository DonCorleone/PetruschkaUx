import { Component, Input, ViewEncapsulation } from '@angular/core';
import { LoadingIndicatorService } from '../../services/loading-indicator.service';
import { CommonModule } from '@angular/common';
import {
  heartBeatAnimation,
} from 'angular-animations';

@Component({
  selector: 'app-loading-indicator',
  templateUrl: './loading-indicator.component.html',
  styleUrls: ['./loading-indicator.component.scss'],
  encapsulation: ViewEncapsulation.None,
  standalone: true,
  imports: [CommonModule],
  animations: [heartBeatAnimation({ anchor: 'flash', duration: 2000, scale: 1.7 })],
})
export class LoadingIndicatorComponent {
  @Input() title: string;
  constructor(private readonly loadingIndicatorService: LoadingIndicatorService) {}
  get loading$() {
    return this.loadingIndicatorService.loading$;
  }
  animState = false;
}
