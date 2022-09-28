import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Observable } from 'rxjs';
import { EventLocation, LocationsService } from 'src/app/services/locations.service';

@Component({
  selector: 'app-location-item',
  templateUrl: './location-item.component.html',
  styleUrls: ['./location-item.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LocationItemComponent {
  eventLocation$: Observable<EventLocation>;
  @Input() set eventLocationName(value: string) {
    this.eventLocation$ = this.locationsService.GetEventLocation(value);
  }

  constructor(private locationsService: LocationsService, private sanitizer: DomSanitizer) {}

  GetImageUrl(name: string): string {
    let imageUrl = 'https://petruschka.netlify.app/' + 'assets/images/members/' + encodeURIComponent(name) + '.jpg';
    return 'https://images.weserv.nl/?url=' + imageUrl + '&w583&h=738';
  }

  transformHtml(htmlTextWithStyle) {
    return this.sanitizer.bypassSecurityTrustHtml(htmlTextWithStyle);
  }
}
