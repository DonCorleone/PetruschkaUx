import { Component, Renderer2, AfterViewInit } from '@angular/core';
import { scrollspy } from 'node_modules/bootstrap/js/dist';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})

export class HeaderComponent implements AfterViewInit {

  currentSection = 'promo';

  constructor(private renderer: Renderer2) {

    /* ======= Fixed Header animation ======= */
    this.renderer.listen(window, 'load', (event) => {
      if (window.scrollY > 0) {
        this.renderer.addClass(document.getElementById('header'), 'header-scrolled');
      } else {
        this.renderer.removeClass(document.getElementById('header'), 'header-scrolled');
      }
    });

    this.renderer.listen(window, 'scroll', (event) => {
      if (window.scrollY > 0) {
        this.renderer.addClass(document.getElementById('header'), 'header-scrolled');
      } else {
        this.renderer.removeClass(document.getElementById('header'), 'header-scrolled');
      }
    });
  }

  onSectionChange(sectionId: string) {
    this.currentSection = sectionId;
  }

  scrollTo(section) {
    document.querySelector('#' + section)
    .scrollIntoView({behavior: 'smooth'});
  }

  ngAfterViewInit(): void {
    /* ======= Scrollspy ======= */

        /* ======= Scrollspy ======= */
       // $('body').scrollspy({ target: '#header', offset: 100});

   // this.renderer.setAttribute(document.getElementsByTagName('body')[0].scrollspy({ target: '#header', offset: 100});

    /* ======= ScrollTo ======= */
    const scrollTos: HTMLCollectionOf<Element> = document.getElementsByClassName('scrollto');
    for (const key in scrollTos) {
      if (scrollTos.hasOwnProperty(key)) {
        const element = scrollTos[key];
        this.renderer.listen(element, 'click', (eventInner) => {
          // Collapse mobile menu after clicking
          if (document.getElementsByClassName('navbar-collapse')[0].classList.contains('show')) {
            document.getElementsByClassName('navbar-collapse')[0].classList.remove('show');
          }
        });
      }
    }
  }
}
