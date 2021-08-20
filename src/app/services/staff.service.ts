import {Injectable} from '@angular/core';
import {Apollo, gql} from 'apollo-angular';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {Job, Staff} from '../models/staff.models';

const GET_STAFFS = gql`
	query GetStaffByName {
		staffs (
		query:
					{active: true}
			, sortBy: SORTORDER_ASC
		){
			name
			topic
		}
	}
`;

const GET_STAFFBYNAME = gql`
  query GetStaffByName($name: String!) {
    staff (query:{name:$name}){
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
	providedIn: 'root'
})
export class StaffService {

	constructor(private apollo: Apollo) {
	}

	GetStaffs(): Observable<Staff[]> {
		console.log(`GetStaffs`);
		return this.apollo
			.watchQuery<GetStaffs>({
				query: GET_STAFFS,
			})
			.valueChanges.pipe(map((result) => result.data.staffs));
	}

 	GetStaff(nameIn: string): Observable<Staff> {

		console.log(`GetStaff`);
		return this.apollo
			.watchQuery<GetStaff>({
				query: GET_STAFFBYNAME,
				variables: {
					name: nameIn
				},
			})
			.valueChanges.pipe(map((result) => result.data.staff));
	}

	static GetStaffLinks(staff: string): Job [] {

		const returnval: Job [] = [];
		if (staff.length === 0) {
			return returnval;
		}

		const jobs = staff.split('|');

		jobs.forEach(job => {

			console.log(`map job ${job}`);

			const ixOfSplitterColon = job.indexOf(':');
			const ixOfSplitterDash = job.indexOf('-');

			const sharerArray: string[] = [];

			const name: string = job.slice(0, ixOfSplitterColon > 0 ? ixOfSplitterColon : ixOfSplitterDash) ;
			const sharersRaw = job.substring(ixOfSplitterColon > 0 ? ixOfSplitterColon + 1 : ixOfSplitterDash + 1).split('&');

			sharersRaw.forEach(sharerRaw => {

				sharerArray.push(sharerRaw.trim());
			});

			const jobObject: Job = {
				isJobSharing: ixOfSplitterColon > 0,
				name: name.trim(),
				values: sharerArray
			};

			returnval.push(jobObject);
		});

		return returnval;
	}
}

