import { isPlatformBrowser } from '@angular/common';
import { AfterViewInit, ChangeDetectionStrategy, Component, Inject, PLATFORM_ID, Renderer2 } from '@angular/core';
import { RouterLink } from '@angular/router';
import { NgbCollapse } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  standalone: true,
  imports: [NgbCollapse, RouterLink],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderComponent implements AfterViewInit {
  currentSection = 'promo';
  public isMenuCollapsed = true;

  constructor(
    private renderer: Renderer2,
    @Inject(PLATFORM_ID)
    private platformId: any
  ) {}
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
    if (!isPlatformBrowser(this.platformId)) {
      return;
    }
    const navElements: HTMLCollectionOf<Element> = document.getElementsByClassName('nav-item');
    for (const key in navElements) {
      if (navElements.hasOwnProperty(key)) {
        const element = navElements[key];
        this.renderer.listen(element, 'click', () => {
          if (document.getElementsByClassName('navbar-collapse')[0].classList.contains('show')) {
            document.getElementsByClassName('navbar-collapse')[0].classList.remove('show');
          }
        });
      }
    }
  }
}
