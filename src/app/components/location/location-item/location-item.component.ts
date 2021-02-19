import { Component, Input, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Observable } from 'rxjs';
import { EventLocation } from 'src/app/models/location.models';
import { LocationsService } from 'src/app/services/locations.service';

@Component({
  selector: 'app-location-item',
  templateUrl: './location-item.component.html',
  styleUrls: ['./location-item.component.scss']
})
export class LocationItemComponent implements OnInit {

  eventLocation$: Observable<EventLocation>;

  constructor(private locationsService: LocationsService, private sanitizer: DomSanitizer ) { }

  @Input() eventLocationName:string;

  GetImageUrl(name: string): string{
    return '../assets/images/members/' + encodeURIComponent(name) + '.jpg'
  }
  ngOnInit(): void {

    this.eventLocation$ = this.locationsService.GetEventLocation(this.eventLocationName);
  }
  transformHtml(htmlTextWithStyle) {
    return this.sanitizer.bypassSecurityTrustHtml(htmlTextWithStyle);
  }
}