import {
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
  WsResponse,
  OnGatewayInit,
} from '@nestjs/websockets';
import { from, Observable, of } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { CacheService } from 'cache.service';

@WebSocketGateway()
// @WebSocketGateway(3001, { transports: ['websocket'] })
export class EventsGateway implements OnGatewayInit {
  // @WebSocketServer()
  // server;

  afterInit(server: any) {
    this.cacheService.$events
      .pipe(
        tap(x => console.log('got new event, emitting to client')),
        // map(item => ({ event: 'events', data: item })),
      )
      .subscribe(x => {
        console.log('submitting event via WS', x);
        server.emit('events', x);
      });
  }

  constructor(private cacheService: CacheService) {}

  // @SubscribeMessage('events')
  // findAll(client, data): Observable<WsResponse<any>> {
  //   return this.cacheService.$events.pipe(
  //     tap(x => console.log('got new event, emitting to client')),
  //     map(item => ({ event: 'events', data: item })),
  //   );
  // }

  // @SubscribeMessage('identity')
  // async identity(client, data: number): Promise<number> {
  //   return data;
  // }
}
