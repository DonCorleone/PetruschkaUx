import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AudioComponent } from './audio.component';
import { MusicListComponent } from '../../components/music/music-list/music-list.component';
import { MusicItemComponent } from '../../components/music/music-item/music-item.component';
import { SharedModule } from '../shared/shared.module';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [{ path: '', component: AudioComponent }];
@NgModule({
  declarations: [AudioComponent, MusicListComponent, MusicItemComponent],
  imports: [CommonModule, SharedModule, RouterModule.forChild(routes)],
})
export class AudioModule {}
