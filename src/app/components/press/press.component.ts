import { Component, OnInit } from '@angular/core';
import { NgbCarouselConfig } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs';
import { Press, PressService } from 'src/app/services/press.service';

@Component({
  selector: 'app-press',
  templateUrl: './press.component.html',
  styleUrls: ['./press.component.scss']
})
export class PressComponent implements OnInit {

	pressArticles$: Observable<Press[]>
	todayDate = new Date();

	getDate(article:Press):Date{
		if (article !== undefined && article.date !== undefined) {
			let newDate = new Date(article.date);
			if (newDate !== undefined){
				return newDate;
			}else{
				return this.todayDate;
			}
		}
	}
  constructor(private pressService: PressService, config: NgbCarouselConfig) {
		config.showNavigationArrows = false;
		config.showNavigationIndicators = true;
	 }

  ngOnInit(): void {
		this.pressArticles$ = this.pressService.GetPressArticles();
  }
}
