import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AboutModalComponent } from '../about-modal/about-modal.component';
import { Staff } from '../../../models/staff.models';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-about-detail',
  templateUrl: './about-detail.component.html',
  styleUrls: ['./about-detail.component.scss'],
  standalone: true,
  imports: [CommonModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AboutDetailComponent {
  @Input() staff: Staff;
  @Input() isModal: boolean;

  constructor(private modalService: NgbModal) {}

  openStaff(staffName: string) {
    const modalRef = this.modalService.open(AboutModalComponent, { size: 'sm' });
    modalRef.componentInstance.staffName = staffName;
  }
}
