import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AboutModalComponent } from '../about-modal/about-modal.component';
import { Staff } from '../../../models/staff.models';
import { CommonModule } from '@angular/common';
import { StaffService } from '../../../services/staff.service';
import { take } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-about-detail',
  templateUrl: './about-detail.component.html',
  styleUrls: ['./about-detail.component.scss'],
  standalone: true,
  imports: [CommonModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AboutDetailComponent implements OnInit {
  @Input() staffName: string;
  staff$: Observable<Staff>;
  constructor(private staffService: StaffService) {}

  ngOnInit(): void {
    this.staff$ = this.staffService.GetStaff(this.staffName);
  }
}
