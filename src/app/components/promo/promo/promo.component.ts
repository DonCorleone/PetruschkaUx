import { Component, OnInit, Renderer2 } from '@angular/core';


@Component({
  selector: 'app-promo',
  templateUrl: './promo.component.html',
  styleUrls: ['./promo.component.scss']
})
export class PromoComponent implements OnInit {

  title: string;
  constructor(private renderer: Renderer2) {}

  ngOnInit(): void {
    this.title="Petruschka";
  }
}
