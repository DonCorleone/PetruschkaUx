import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {NgbActiveModal} from "@ng-bootstrap/ng-bootstrap";
import {ImpressumComponent} from "../impressum/impressum.component";

@Component({
  selector: 'app-impressum-modal',
  standalone: true,
	imports: [CommonModule, ImpressumComponent],
  templateUrl: './impressum-modal.component.html',
})
export class ImpressumModalComponent {
	constructor(public activeModal: NgbActiveModal) {}
}
