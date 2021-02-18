import { Component, Input, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Staff } from 'src/app/models/staff.models';
import { StaffService } from 'src/app/services/staff.service';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss']
})
export class AboutComponent implements OnInit {

  staffs$: Observable<Staff[]>;

  staffTitle:string = "Mitwirkende";

  constructor(private route: ActivatedRoute, private staffService: StaffService, private sanitizer: DomSanitizer ) { }
  @Input() staffName:string;

  ngOnInit(): void {

    this.route.params
      .pipe(map(p => p.staffName))
      .subscribe(nameIn => {
        this.staffName = nameIn;
        this.staffs$ = this.staffService.GetStaffs(nameIn);
     });
  }
}
