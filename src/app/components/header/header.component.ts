import { AfterViewInit, ChangeDetectionStrategy, Component, Renderer2 } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderComponent implements AfterViewInit {
  currentSection = 'promo';
  public isMenuCollapsed = true;

  constructor(private renderer: Renderer2) {
    /* ======= Fixed Header animation ======= */
    this.renderer.listen(window, 'load', () => {
      if (window.scrollY > 0) {
        this.renderer.addClass(document.getElementById('header'), 'header-scrolled');
      } else {
        this.renderer.removeClass(document.getElementById('header'), 'header-scrolled');
      }
    });

    this.renderer.listen(window, 'scroll', () => {
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
    document.querySelector('#' + section).scrollIntoView({ behavior: 'smooth' });
    this.onSectionChange(section);
  	this.isMenuCollapsed = true;
  }

  ngAfterViewInit(): void {

		var root = document.documentElement;
		const lists = document.querySelectorAll('.hs');

		lists.forEach(el => {
			const listItems = el.querySelectorAll('li');
			listItems.forEach(liEl => {
				const n = liEl.children.length;
				this.renderer.setProperty(liEl,'--total', n);
			})

		});

    /* ======= ScrollTo =======
    const navElements: HTMLCollectionOf<Element> = document.getElementsByClassName('nav-item');
    for (const key in navElements) {
      if (navElements.hasOwnProperty(key)) {
        const element = navElements[key];
        this.renderer.listen(element, 'click', () => {
          // Collapse mobile menu after clicking
          if (document.getElementsByClassName('navbar-collapse')[0].classList.contains('show')) {
            document.getElementsByClassName('navbar-collapse')[0].classList.remove('show');
          }
        });
      }
    }*/
  }
}
