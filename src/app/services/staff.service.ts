import { getQueryPredicate } from '@angular/compiler/src/render3/view/util';
import { Injectable } from '@angular/core';
import { Apollo, gql } from 'apollo-angular';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Staff } from '../models/staff';

const GET_STAFFS = gql`
  query GetStaffByName {
    staffs {
      name
      bio
    }
  }
`;

interface GetStaffs{
  staffs: Staff[];
};

@Injectable({
  providedIn: 'root'
})
export class StaffService {

  constructor(private apollo: Apollo) { }

  public GetStaffs(nameIn: string): Observable<Staff[]>  {

    return this.apollo
        .watchQuery<GetStaffs>({
          query: GET_STAFFS,
          variables: {
            name: nameIn
          },})
        .valueChanges.pipe(map((result) => result.data.staffs.filter(nameIn? p => p.name == nameIn : o => o.name != "")));
  }
}

