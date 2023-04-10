import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { Job, Staff } from '../models/staff.models';

interface Message {
  documents: Staff[];
}

interface GetStaffOverviewResponse {
  message: Message;
}

@Injectable({
  providedIn: 'root',
})
export class StaffService {
  constructor(private httpClient: HttpClient) {}

  staffs$ = this.httpClient.get<GetStaffOverviewResponse>('.netlify/functions/get_staff_overview').pipe(
    map((result) => result.message.documents),
    map((staffs) => {
      return staffs.map((staff) => this.getStaffWithSrc(staff));
    })
  );

  GetStaff(nameIn: string): Observable<Staff> {
    return this.httpClient.get<GetStaffOverviewResponse>('.netlify/functions/get_staff').pipe(
      map((result) => result?.message?.documents),
      map((staff) => this.getStaffWithSrc(staff.find((x) => x.name == nameIn)))
    );
  }

  private getStaffWithSrc(staff: Staff) {
    return {
      ...staff,
      imageSrc:
        'https://www.petruschka.ch/assets/images/staff/' + encodeURIComponent(staff?.name) + '.jpg?nf_resize=fit&h=240',
    };
  }

  static GetStaffLinks(staff: string): Job[] {
    const returnval: Job[] = [];
    if (staff.length === 0) {
      return returnval;
    }

    const jobs = staff.split('|');

    jobs.forEach((job) => {
      const ixOfSplitterColon = job.indexOf(':');
      const ixOfSplitterDash = job.indexOf('-');

      const sharerArray: string[] = [];

      const name: string = job.slice(0, ixOfSplitterColon > 0 ? ixOfSplitterColon : ixOfSplitterDash);
      const sharersRaw = job.substring(ixOfSplitterColon > 0 ? ixOfSplitterColon + 1 : ixOfSplitterDash + 1).split('&');

      sharersRaw.forEach((sharerRaw) => {
        sharerArray.push(sharerRaw.trim());
      });

      const jobObject: Job = {
        isJobSharing: ixOfSplitterColon > 0,
        name: name.trim(),
        values: sharerArray,
      };

      returnval.push(jobObject);
    });

    return returnval;
  }
}
