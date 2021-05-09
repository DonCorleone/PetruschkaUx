import {ChangeDetectionStrategy, Component, Input, OnInit} from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import {Staff} from 'src/app/models/staff.models';
import { AboutModalComponent } from '../about-modal/about-modal.component';


@Component({
	selector: 'app-about-item',
	templateUrl: './about-item.component.html',
	styleUrls: ['./about-item.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class AboutItemComponent implements OnInit {

	@Input() staff: Staff;
	@Input() isModal: boolean;

	constructor(private modalService: NgbModal) {
	}

	ngOnInit(): void {
	}

	GetImageUrl(name: string): string {
		let imageUrl = 'https://petruschka.netlify.app/' + 'assets/images/members/' + encodeURIComponent(name) + '.jpg';
		return "https://images.weserv.nl/?url=" + imageUrl + "&w=179&h=240";
	}

	openStaff(staffName: string) {
		const modalRef = this.modalService.open(AboutModalComponent, { size:'sm' });
		modalRef.componentInstance.staffName = staffName;
	}
}
