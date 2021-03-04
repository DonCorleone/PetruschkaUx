import {Component, Input, OnInit} from '@angular/core';
import {Observable} from 'rxjs';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {Staff} from 'src/app/models/staff.models';
import {StaffService} from 'src/app/services/staff.service';

@Component({
	selector: 'app-about-modal',
	templateUrl: './about-modal.component.html',
	styleUrls: ['./about-modal.component.scss']
})
export class AboutModalComponent implements OnInit {

	@Input() staffName: string;
	staff$: Observable<Staff>;

	constructor(public activeModal: NgbActiveModal, private staffService: StaffService) {
	}

	ngOnInit(): void {
		if (this.staffName) {
			this.staff$ = this.staffService.GetStaff(this.staffName);
		}
	}
}
