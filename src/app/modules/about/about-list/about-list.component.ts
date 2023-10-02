import { ChangeDetectionStrategy, Component } from '@angular/core';
import { StaffService } from '../../../services/staff.service';
import { AboutItemComponent } from '../about-item/about-item.component';
import { LoadingIndicatorComponent } from 'src/app/components/loading-indicator/loading-indicator.component';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-about-list',
    templateUrl: './about-list.component.html',
    styleUrls: ['./about-list.component.scss'],
    standalone: true,
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [CommonModule, LoadingIndicatorComponent, AboutItemComponent]
})
export class AboutListComponent {
  staffs$ = this.staffService.staffs$;

  constructor(private staffService: StaffService) {}
}
