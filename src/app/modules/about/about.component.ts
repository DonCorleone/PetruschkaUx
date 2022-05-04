import { ChangeDetectionStrategy, Component } from '@angular/core';
import { StaffService } from '../../services/staff.service';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AboutComponent {
  staffs$ = this.staffService.staffs$;

  constructor(private staffService: StaffService) {}
}
