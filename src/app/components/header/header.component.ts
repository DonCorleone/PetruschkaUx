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

  constructor(private renderer: Renderer2) { }
/*

  onSectionChange(sectionId: string) {
    this.currentSection = sectionId;
  }
*/

/*
  scrollTo(section) {
    document.querySelector('#' + section).scrollIntoView({ behavior: 'smooth' });
    this.onSectionChange(section);
  	this.isMenuCollapsed = true;
  }
*/

  ngAfterViewInit(): void {
    /* ======= ScrollTo ======= */
    const scrollTos: HTMLCollectionOf<Element> = document.getElementsByClassName('scrollto');
    for (const key in scrollTos) {
      if (scrollTos.hasOwnProperty(key)) {
        const element = scrollTos[key];
        this.renderer.listen(element, 'click', () => {
          // Collapse mobile menu after clicking
          if (document.getElementsByClassName('navbar-collapse')[0].classList.contains('show')) {
            document.getElementsByClassName('navbar-collapse')[0].classList.remove('show');
          }
        });
      }
    }
  }
}
