import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-tour',
  templateUrl: './tour.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TourComponent {}
