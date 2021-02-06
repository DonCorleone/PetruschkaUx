import { Component, OnInit, Renderer2, AfterViewInit } from '@angular/core';
/// <reference path ="../../node_modules/@types/jquery/index.d.ts"/>
// declare var $: any;

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
