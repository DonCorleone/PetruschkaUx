import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Staff } from '../../models/staff.models';
import { StaffService } from '../../services/staff.service';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AboutComponent implements OnInit {
  staffs$: Observable<Staff[]>;

  constructor(private staffService: StaffService) {}

  ngOnInit(): void {
    this.staffs$ = this.staffService.GetStaffs();
  }
}
