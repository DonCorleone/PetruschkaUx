import { ChangeDetectionStrategy, Component } from '@angular/core';
import { LoadingIndicatorComponent } from '../../loading-indicator/loading-indicator.component';
import { UpdateListComponent } from '../../update/update-list/update-list.component';

@Component({
  selector: 'app-history-list',
  templateUrl: './history-list.component.html',
  styleUrls: ['./history-list.component.scss'],
  standalone: true,
  imports: [LoadingIndicatorComponent, UpdateListComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HistoryListComponent {
  dateGte: Date = new Date(new Date().setFullYear(1753));

  dateLt: Date = new Date();

  constructor() {
    let d = new Date();
    this.dateLt.setDate(d.getDate() - 60);
  }
}
