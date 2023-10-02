import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { registerLocaleData } from '@angular/common';
import localeDeCH from '@angular/common/locales/de-CH';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [HeaderComponent, FooterComponent, RouterOutlet],
})
export class AppComponent implements OnInit {
  ngOnInit() {
    registerLocaleData(localeDeCH, 'de-CH');
  }
}
