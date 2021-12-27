import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Staff } from 'src/app/models/staff.models';

@Component({
  selector: 'app-about-list',
  templateUrl: './about-list.component.html',
  styleUrls: ['./about-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AboutListComponent {
  @Input()
  staffs: Staff[];
}
