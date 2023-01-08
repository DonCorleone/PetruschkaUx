import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-audio',
  templateUrl: './audio.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AudioComponent {}
