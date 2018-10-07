import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  NbCardModule,
  NbLayoutModule,
  NbButtonModule,
  NbListModule,
} from '@nebular/theme';

const sharedModules = [
  NbLayoutModule,
  NbButtonModule,
  NbCardModule,
  NbListModule,
];

@NgModule({
  imports: [CommonModule, ...sharedModules],
  declarations: [],
  exports: [...sharedModules],
})
export class SharedModule {}
