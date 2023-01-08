import { ChangeDetectionStrategy, Component } from '@angular/core';
import { StaffService } from '../../../services/staff.service';

@Component({
  selector: 'app-about-list',
  templateUrl: './about-list.component.html',
  styleUrls: ['./about-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AboutListComponent {
  staffs$ = this.staffService.staffs$;

  constructor(private staffService: StaffService) {}
}
