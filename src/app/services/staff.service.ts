import { Injectable } from '@angular/core';
import { Apollo, gql } from 'apollo-angular';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Job, Staff } from '../models/staff.models';

const GET_STAFFS = gql`
	query {
		staffs: staffOverviews {
			name
			topic
		}
	}
`;

const GET_STAFFBYNAME = gql`
  query GetStaffByName($name: String!) {
    staff(query: { name: $name }) {
      name
      bio
      topic
    }
  }
`;

interface GetStaffs {
  staffs: Staff[];
}

interface GetStaff {
  staff: Staff;
}

@Injectable({
  providedIn: 'root',
})
export class StaffService {
  constructor(private apollo: Apollo) {}

  staffs$ = this.apollo
    .query<GetStaffs>({
      query: GET_STAFFS,
    })
    .pipe(
      map((result) => result.data.staffs),
      map((staffs) => {
        return staffs.map((staff) => this.getStaffWithSrc(staff));
      })
    );

  GetStaff(nameIn: string): Observable<Staff> {
    return this.apollo
      .query<GetStaff>({
        query: GET_STAFFBYNAME,
        variables: {
          name: nameIn,
        },
      })
      .pipe(
        map((result) => result?.data?.staff),
        map((staff) => this.getStaffWithSrc(staff))
      );
  }

  private getStaffWithSrc(staff: Staff) {
    return {
      ...staff,
      imageSrc:
        'https://images.weserv.nl/?url=' +
        'https://petruschka.netlify.app/' +
        'assets/images/members/' +
        encodeURIComponent(staff?.name) +
        '.jpg' +
        '&w=179&h=240',
    };
  }

  static GetStaffLinks(staff: string): Job[] {
    const returnval: Job[] = [];
    if (staff.length === 0) {
      return returnval;
    }

    const jobs = staff.split('|');

    jobs.forEach((job) => {
      console.log(`map job ${job}`);

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
