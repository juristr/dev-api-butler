import { Injectable, HttpService, HttpException } from '@nestjs/common';
import { tap, map, catchError } from 'rxjs/operators';
import { of, throwError, Subject } from 'rxjs';

// TODO: fetch from config file
// ideally JSON which can be changed at runtime and reloaded without server restart => loosing caches
const endpointUrl = 'http://localhost:10081';
const urlCachePatterns = [
  /.*\/grid\/.*/gi,
  /.*\/options\/.*/gi,
  /.*application\/configuration\.json/gi,
  /.*rest\/district\/.*/gi,
  /.*\/new.json/gi,
  /.*\/security\/context\.json/gi,
  // GET by id requests for entities
  /.*\/rest\/\w*\/[0-9]*\.json/gi,
  // list requests
  /.*\/rest\/\w*\.json.*/gi,
];

@Injectable()
export class CacheService {
  private subject = new Subject();

  $events = this.subject.asObservable();

  private cachedResponses = {};

  constructor(private httpService: HttpService) {}

  sendRequest(req) {
    const key = this.computeKey(req);

    const cachedResponse = this.cachedResponses[key];
    if (req.method === 'GET' && cachedResponse) {
      console.log(`returning ${req.url} from cache`);
      this.subject.next({
        type: 'log',
        payload: `returning ${req.url} from cache`,
      });
      return of(cachedResponse);
    } else {
      return this.httpService
        .request({
          method: req.method,
          url: `${endpointUrl}${req.url}`,
          headers: req.headers,
          data: req.method === 'GET' ? null : req.body,
        })
        .pipe(
          map(x => x.data),
          tap(x => {
            if (req.method === 'GET') {
              if (this.shouldCache(req.url)) {
                console.log(`Caching ${req.url}`);
                this.cachedResponses[key] = x;
                this.subject.next({
                  type: 'cached-entry',
                  payload: {
                    url: req.url,
                  },
                });
              }
            } else {
              // POST/PUT/DELETE request on this key should trigger
              // reset of that cache. Naive approach ofc
              this.cachedResponses[key] = null;
            }
          }),
          catchError(err => {
            if (err.response) {
              return throwError(
                new HttpException(err.response.data, err.response.status),
              );
            } else {
              console.error(err);
              return throwError(new HttpException(null, 0));
            }
          }),
        );
    }
  }

  cachedEntries() {
    return Object.keys(this.cachedResponses);
  }

  clearCache() {
    this.cachedResponses = {};
  }

  private computeKey(req) {
    return `${req.url}`;
  }

  private shouldCache(url: string) {
    for (let regex of urlCachePatterns) {
      if (url.match(regex)) {
        return true;
      }
    }

    return false;
  }
}
