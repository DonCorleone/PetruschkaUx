import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-gigs-item',
  templateUrl: './gigs-item.component.html',
  styleUrls: ['./gigs-item.component.scss']
})
export class GigsItemComponent implements OnInit {

  public isCollapsed = true;
  constructor() { }

  ngOnInit(): void {
  }

}
