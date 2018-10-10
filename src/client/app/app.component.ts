import { Component } from '@angular/core';
import { BackendService } from './core/backend.service';
import { filter, switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  cachedEntries = [];

  constructor(private backend: BackendService) {
    this.backend
      .connect()
      .pipe(
        filter(x => x.type === 'cached-entry'),
        switchMap(() => this.backend.getCachedEntries()),
      )
      .subscribe(x => {
        this.cachedEntries = x;
      });
  }

  removeEntry(entry) {
    this.backend
      .removeCacheEntry(entry)
      .pipe(switchMap(() => this.backend.getCachedEntries()))
      .subscribe(x => {
        this.cachedEntries = x;
      });
  }

  refreshCachedEntries() {
    this.backend.getCachedEntries().subscribe(x => {
      this.cachedEntries = x;
    });
  }

  clearCache() {
    this.backend.clearCache().subscribe(
      x => {},
      err => {
        alert('something went wrong');
      },
    );
  }
}
