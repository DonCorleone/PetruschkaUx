import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Observable } from 'rxjs';
import { LocationsService } from 'src/app/services/locations.service';
import { EventLocation, LocationIdName } from '../../../models/location.models';

@Component({
  selector: 'app-location-item',
  templateUrl: './location-item.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LocationItemComponent {
  eventLocation$: Observable<EventLocation>;

  @Input() set eventLocationIdName(value: LocationIdName) {
    this.eventLocation$ = this.locationsService.GetEventLocation(value);
  }

  constructor(private locationsService: LocationsService, private sanitizer: DomSanitizer) {}

  GetImageUrl(name: string): string {
    return (
      'https://www.petruschka.ch/assets/images/staff/' + encodeURIComponent(name) + '.jpg' + '?nf_resize=fit&w=538'
    );
  }

  transformHtml(htmlTextWithStyle) {
    return this.sanitizer.bypassSecurityTrustHtml(htmlTextWithStyle);
  }
}
