import { Component, OnInit } from '@angular/core';
/// <reference path ="../../node_modules/@types/jquery/index.d.ts"/>
declare var $: any;

@Component({
  selector: 'app-promo',
  templateUrl: './promo.component.html',
  styleUrls: ['./promo.component.scss']
})
export class PromoComponent implements OnInit {

  title = 'NEVA';
  constructor() { }

  ngOnInit() {
    /* ======= Vegas Plugin ======= */
    /* Ref: http://vegas.jaysalvat.com/index.html */
    $('#promo').vegas({
      delay: 8000,
      overlay: 'assets/plugins/vegas/dist/overlays/06.png',
      color: '#101113',
      transition: 'zoomOut',
      transitionDuration: 3000,
      slides: [
          { src: 'assets/images/hero/hero-1.jpg' },
          { src: 'assets/images/hero/hero-2.jpg' },
          { src: 'assets/images/hero/hero-3.jpg' },
          { src: 'assets/images/hero/hero-4.jpg' },
          { src: 'assets/images/hero/hero-5.jpg' },
          { src: 'assets/images/hero/hero-6.jpg' },
          { src: 'assets/images/hero/hero-7.jpg' },
          { src: 'assets/images/hero/hero-8.jpg' }
      ]
  });
  }

}
