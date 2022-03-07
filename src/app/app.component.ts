import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { registerLocaleData } from '@angular/common';
import localeDeCH from '@angular/common/locales/de-CH';
import jwtDecode from 'jwt-decode';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent implements OnInit {
  ngOnInit() {
    registerLocaleData(localeDeCH, 'de-CH');
  }

  constructor() {
    const token = sessionStorage.getItem('token');
		if (token) {
			console.log('token found');
			const decoded = jwtDecode(token);
			const expDate = +decoded['exp'];
			if (expDate < Date.now() / 1000) {
				sessionStorage.removeItem('token')
				console.log('expired');
			}else{
				console.log('valid');
			}
		}
  }
}
