import {ChangeDetectionStrategy, Component, Input, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Observable} from 'rxjs';
import {map, tap} from 'rxjs/operators';
import {Staff} from 'src/app/models/staff.models';
import {StaffService} from 'src/app/services/staff.service';

@Component({
	selector: 'app-about-list',
	templateUrl: './about-list.component.html',
	styleUrls: ['./about-list.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class AboutListComponent implements OnInit {

	staffs$: Observable<Staff[]>;

	staffTitle = 'Mitwirkende';

	constructor(private route: ActivatedRoute, private staffService: StaffService) {
	}

	ngOnInit(): void {

		this.staffs$ = this.staffService.GetStaffs();
	}
}
