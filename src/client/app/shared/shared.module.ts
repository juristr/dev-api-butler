import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NbCardModule, NbLayoutModule, NbButtonModule } from '@nebular/theme';

const sharedModules = [NbLayoutModule, NbButtonModule, NbCardModule];

@NgModule({
  imports: [CommonModule, ...sharedModules],
  declarations: [],
  exports: [...sharedModules],
})
export class SharedModule {}
