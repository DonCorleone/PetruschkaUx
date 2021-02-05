import { Component, Renderer2 } from '@angular/core';
import { Apollo, gql } from 'apollo-angular';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  constructor(private renderer: Renderer2, private apollo: Apollo) {
    this.apollo.watchQuery({
      query: gql`
  query GetStaffByName {
    staffs {
      name
      bio
    }
  }
`})
      .valueChanges.subscribe(r => {
        console.log(r);
      });

    this.renderer.setAttribute(document.body, 'data-spy', 'scroll');
  }
}
