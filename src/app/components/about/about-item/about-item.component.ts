import {Component, Input, OnInit} from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import {Staff} from 'src/app/models/staff.models';
import { AboutModalComponent } from '../about-modal/about-modal.component';


@Component({
	selector: 'app-about-item',
	templateUrl: './about-item.component.html',
	styleUrls: ['./about-item.component.scss']
})
export class AboutItemComponent implements OnInit {

	@Input() staff: Staff;
	@Input() isModal: boolean;

	constructor(private modalService: NgbModal) {
	}

	ngOnInit(): void {
	}

	GetImageUrl(name: string): string {
		return '../assets/images/members/' + encodeURIComponent(name) + '.jpg';
	}

	openStaff(staffName: string) {
		const modalRef = this.modalService.open(AboutModalComponent, { size:'sm' });
		modalRef.componentInstance.staffName = staffName;
	}
}
