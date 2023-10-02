import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { LoadingIndicatorComponent } from '../loading-indicator/loading-indicator.component';

@Component({
  selector: 'app-success',
  templateUrl: './success.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [LoadingIndicatorComponent],
})
export class SuccessComponent {}
