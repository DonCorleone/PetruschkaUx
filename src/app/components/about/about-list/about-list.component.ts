import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Staff } from 'src/app/models/staff.models';
import { StaffService } from 'src/app/services/staff.service';

@Component({
  selector: 'app-about-list',
  templateUrl: './about-list.component.html',
  styleUrls: ['./about-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AboutListComponent implements OnInit {
  staffs$: Observable<Staff[]>;
  staffTitle = 'Mitwirkende';

  constructor(private staffService: StaffService) {}

  ngOnInit(): void {
    this.staffs$ = this.staffService.GetStaffs();
  }
}
