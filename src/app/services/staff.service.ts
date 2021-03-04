import {Injectable} from '@angular/core';
import {Apollo, gql} from 'apollo-angular';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {Staff} from '../models/staff.models';

const GET_STAFFS = gql`
  query GetStaffByName {
    staffs (sortBy: SORTORDER_ASC){
      name
      bio
      topic
      sortOrder
      active
    }
  }
`;

const GET_STAFFBYNAME = gql`
  query GetStaffByName($name: String!) {
    staff (query:{name:$name}){
      name
      bio
      topic
      sortOrder
      active
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

	public GetStaffs(nameIn: string): Observable<Staff[]> {

		return this.apollo
			.watchQuery<GetStaffs>({
				query: GET_STAFFS,
				variables: {
					name: nameIn
				},
			})
			.valueChanges.pipe(map((result) => result.data.staffs.filter(
				nameIn ? p => p.name === nameIn : o => o.name !== '').filter(p => p.active === true).sort(p => p.sortOrder)));
	}

	public GetStaff(nameIn: string): Observable<Staff> {

		return this.apollo
			.watchQuery<GetStaff>({
				query: GET_STAFFBYNAME,
				variables: {
					name: nameIn
				},
			})
			.valueChanges.pipe(map((result) => result.data.staff));
	}
}

