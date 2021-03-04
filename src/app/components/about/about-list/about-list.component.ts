import {Component, Input, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Observable} from 'rxjs';
import {map, tap} from 'rxjs/operators';
import {Staff} from 'src/app/models/staff.models';
import {StaffService} from 'src/app/services/staff.service';

@Component({
	selector: 'app-about-list',
	templateUrl: './about-list.component.html',
	styleUrls: ['./about-list.component.scss']
})
export class AboutListComponent implements OnInit {

	staffs$: Observable<Staff[]>;

	staffTitle = 'Mitwirkende';
	@Input() staffName: string;

	constructor(private route: ActivatedRoute, private staffService: StaffService) {
	}

	ngOnInit(): void {

		this.route.params
			.pipe(map(p => p.staffName))
			.subscribe(nameIn => {
				this.staffName = nameIn;
				this.staffs$ = this.staffService.GetStaffs(nameIn).pipe(tap(res => res.sort((x, y) => x.sortOrder < y.sortOrder ? -1 : 1)));
			});
	}
}
