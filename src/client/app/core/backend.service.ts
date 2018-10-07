import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import * as socketIo from 'socket.io-client';
import { Subject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class BackendService {
  // Our socket connection
  private socket;

  constructor(private http: HttpClient) {}

  clearCache() {
    return this.http.get('/api/cache/clear');
  }

  connect(): Observable<any> {
    // If you aren't familiar with environment variables then
    // you can hard code `environment.ws_url` as `http://localhost:5000`
    this.socket = socketIo('http://localhost:3000');

    // We define our observable which will observe any incoming messages
    // from our socket.io server.
    return Observable.create(observer => {
      this.socket.on('events', data => {
        observer.next(data);
      });
      return () => {
        this.socket.disconnect();
      };
    });

    // // We define our Observer which will listen to messages
    // // from our other components and send messages back to our
    // // socket server whenever the `next()` method is called.
    // // let observer = {
    // //   next: (data: Object) => {
    // //     this.socket.emit('message', JSON.stringify(data));
    // //   },
    // // };

    // // we return our Rx.Subject which is a combination
    // // of both an observer and observable.
    // // return new Subject(observer, observable);
    // return observable;
  }
}
