import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { LoadingIndicatorComponent } from '../../components/loading-indicator/loading-indicator.component';

@Component({
  selector: 'app-success',
  templateUrl: './success.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [SharedModule, LoadingIndicatorComponent],
})
export class SuccessComponent {}
