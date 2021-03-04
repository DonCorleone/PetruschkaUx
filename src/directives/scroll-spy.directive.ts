import {Directive, ElementRef, EventEmitter, HostListener, Input, Output} from '@angular/core';

@Directive({
	// tslint:disable-next-line:directive-selector
	selector: '[scrollSpy]'
})
export class ScrollSpyDirective {
	@Input() public spiedTags = [];
	@Output() public sectionChange = new EventEmitter<string>();
	private currentSection: string;

	constructor(private el: ElementRef) {
	}

	@HostListener('scroll', ['$event'])
	onScroll(event: any) {
		let currentSection: string;
		const children = this.el.nativeElement.children;
		const scrollTop = event.target.scrollTop;
		const parentOffset = event.target.offsetTop;
		for (const child of children) {
			if (this.spiedTags.some(spiedTag => spiedTag === child.tagName)) {
				if ((child.offsetTop - parentOffset) <= scrollTop) {
					currentSection = child.id;
				}
			}
		}
		if (currentSection !== this.currentSection) {
			this.currentSection = currentSection;
			this.sectionChange.emit(this.currentSection);
		}
	}
}
