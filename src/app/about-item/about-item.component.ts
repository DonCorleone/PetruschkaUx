import { Component, Input, OnInit } from '@angular/core';
import { Staff } from '../models/staff';

@Component({
  selector: 'app-about-item',
  templateUrl: './about-item.component.html',
  styleUrls: ['./about-item.component.scss']
})
export class AboutItemComponent implements OnInit {

  @Input() staff:Staff;

  constructor() { }

  ngOnInit(): void {
  }
  GetImageUrl(name: string): string {
    return '../assets/images/' + encodeURIComponent(name) + '.jpg'
  }
}
