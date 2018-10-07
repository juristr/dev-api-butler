import { Component } from '@angular/core';
import { BackendService } from './core/backend.service';
import { filter } from 'rxjs/operators';

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
      .pipe(filter(x => x.type === 'cached-entry'))
      .subscribe(x => {
        this.cachedEntries.push(x);
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
