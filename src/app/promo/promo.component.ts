import { Component, OnInit } from '@angular/core';
import { formatNumber } from '@angular/common';
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

    /* ======= Countdown ========= */
    // set the date we're counting down to
    const targetDate = new Date('July 18, 2020').getTime();



    // get tag element
    const countdown = document.getElementById('countdown-box');
    const daysSpan = document.createElement('SPAN');
    daysSpan.className = 'days';
    countdown.appendChild(daysSpan);
    const hoursSpan = document.createElement('SPAN');
    hoursSpan.className = 'hours';
    countdown.appendChild(hoursSpan);
    const minutesSpan = document.createElement('SPAN');
    minutesSpan.className = 'minutes';
    countdown.appendChild(minutesSpan);
    const secsSpan = document.createElement('SPAN');
    secsSpan.className = 'secs';
    countdown.appendChild(secsSpan);
    setInterval(() => this.startGame2(targetDate, daysSpan, hoursSpan, minutesSpan, secsSpan), 1000);
  }
  startGame2(targetDate: any, daysSpan: HTMLElement, hoursSpan: HTMLElement, minutesSpan: HTMLElement, secsSpan: HTMLElement) {


    // variables for time units
    let days;
    let hours: number;
    let minutes: number;
    let seconds: number;

    // find the amount of "seconds" between now and target
    const currentDate = new Date().getTime();
    let secondsLeft = (targetDate - currentDate) / 1000;

    // do some time calculations
    days = Math.round(secondsLeft / 86400);
    secondsLeft = Math.round(secondsLeft % 86400);

    hours = Math.round(secondsLeft / 3600);
    secondsLeft = Math.round(secondsLeft % 3600);

    minutes = Math.round(secondsLeft / 60);
    seconds = Math.round(secondsLeft % 60);

    // format countdown string + set tag value.
    daysSpan.innerHTML = '<span class="number">' + days + '</span>' + '<span class="unit">Days</span>';
    hoursSpan.innerHTML = '<span class="number">' + hours + '</span>' + '<span class="unit">Hrs</span>';
    minutesSpan.innerHTML = '<span class="number">' + minutes + '</span>' + '<span class="unit">Mins</span>';
    secsSpan.innerHTML = '<span class="number">' + seconds + '</span>' + '<span class="unit">Secs</span>';

  }

}
