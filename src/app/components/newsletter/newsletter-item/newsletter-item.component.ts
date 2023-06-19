import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-newsletter-item',
  templateUrl: './newsletter-item.component.html',
  styleUrls: ['./newsletter-item.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NewsletterItemComponent {}
