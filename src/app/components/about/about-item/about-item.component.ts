import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AboutModalComponent } from '../about-modal/about-modal.component';
import { Staff } from '../../../models/staff.models';
import { CommonModule } from '@angular/common';
import { AboutDetailComponent } from '../about-detail/about-detail.component';

@Component({
  selector: 'app-about-item',
  templateUrl: './about-item.component.html',
  styleUrls: ['./about-item.component.scss'],
  standalone: true,
  imports: [CommonModule, AboutDetailComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AboutItemComponent {
  @Input() staff: Staff;
  @Input() isModal: boolean;

  constructor(private modalService: NgbModal) {}

  openStaff(staffName: string) {
    const modalRef = this.modalService.open(AboutModalComponent, { size: 'sm' });
    modalRef.componentInstance.staffName = staffName;
  }
}
