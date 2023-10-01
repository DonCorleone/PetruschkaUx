import { Component, Input, ViewEncapsulation } from '@angular/core';
import { LoadingIndicatorService } from '../../services/loading-indicator.service';
import { AsyncPipe, NgClass, NgIf } from '@angular/common';

@Component({
  selector: 'app-loading-indicator',
  templateUrl: './loading-indicator.component.html',
  styleUrls: ['./loading-indicator.component.scss'],
  encapsulation: ViewEncapsulation.None,
  standalone: true,
  imports: [NgClass, NgIf, AsyncPipe],
})
  export class LoadingIndicatorComponent {
  @Input() title: string;
  constructor(private readonly loadingIndicatorService: LoadingIndicatorService) {}
  get loading$() {
    return this.loadingIndicatorService.loading$;
  }
}
