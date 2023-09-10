import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { registerLocaleData } from '@angular/common';
import { environment } from '../environments/environment.custom';
import localeDeCH from '@angular/common/locales/de-CH';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent implements OnInit {
  ngOnInit() {
    registerLocaleData(localeDeCH, 'de-CH');
  }
}
