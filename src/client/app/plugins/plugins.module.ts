import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { StatusCardComponent } from './status-card/status-card.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  imports: [CommonModule, SharedModule],
  declarations: [StatusCardComponent],
  exports: [StatusCardComponent],
})
export class PluginsModule {}
