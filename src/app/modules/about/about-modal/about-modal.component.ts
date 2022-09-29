import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { StaffService } from '../../../services/staff.service';
import { Staff } from '../../../models/staff.models';

@Component({
  templateUrl: './about-modal.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AboutModalComponent implements OnInit {
  @Input() staffName: string;

  staff$: Observable<Staff>;

  constructor(public activeModal: NgbActiveModal, private staffService: StaffService) {}

  ngOnInit(): void {
    if (this.staffName) {
      this.staff$ = this.staffService.GetStaff(this.staffName);
    }
  }
}
