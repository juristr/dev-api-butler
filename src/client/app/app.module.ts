import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NbThemeModule, NbLayoutModule, NbButtonModule } from '@nebular/theme';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { RouterModule } from '@angular/router';
import { SharedModule } from './shared';
import { PluginsModule } from './plugins';
import { CoreModule } from './core/core.module';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    RouterModule.forRoot([]),
    NbThemeModule.forRoot({ name: 'default' }),
    CoreModule,
    SharedModule,
    PluginsModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
