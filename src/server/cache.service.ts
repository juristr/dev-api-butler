import { Injectable, HttpService, HttpException } from '@nestjs/common';
import { tap, map, catchError } from 'rxjs/operators';
import { of, throwError, Subject } from 'rxjs';
import * as fs from 'fs';
import * as path from 'path';
import * as filenamify from 'filenamify';

// TODO: fetch from config file
// ideally JSON which can be changed at runtime and reloaded without server restart => loosing caches
const endpointUrl = 'http://localhost:10081';
const urlCachePatterns = [
  /.*\/grid\/.*/gi,
  /.*\/options\/.*/gi,
  // /.*application\/configuration\.json/gi,
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
  private WRITE_TO_DISK = false;
  private subject = new Subject();

  $events = this.subject.asObservable();

  private cachedResponses = {};

  constructor(private httpService: HttpService) {
    if (this.WRITE_TO_DISK) {
      // create fixtures directory
      fs.mkdir(path.join(__dirname, 'fixtures'), { recursive: true }, err => {
        if (err) {
          console.error('error creating directory', err);
        }
      });
    }
  }

  sendRequest(req) {
    const key = this.computeKey(req);

    const cachedResponse = this.cachedResponses[key];
    if (req.method === 'GET' && cachedResponse) {
      console.log(`[cache]: returning ${req.url} from cache`);
      this.subject.next({
        type: 'log',
        payload: `[cache]: returning ${req.url} from cache`,
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
                console.log(`[cache]: caching ${req.url}`);
                this.cachedResponses[key] = x;

                if (this.WRITE_TO_DISK) {
                  fs.writeFile(
                    path.join(__dirname, 'fixtures', `${filenamify(key)}`),
                    JSON.stringify(x),
                    err => {
                      if (err) {
                        console.error(`Error writing file "${key}"`, err);
                      }
                    },
                  );
                }

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
              console.log(`[cache]: clear cache for ${key}`);
              this.cachedResponses[key] = null;

              const byIdRegex = /.*\/rest\/(\w*)\/[0-9]*\.json/gi;
              const reqByIdMatch = byIdRegex.exec(key);
              if (reqByIdMatch && reqByIdMatch.length > 1) {
                const objectType = reqByIdMatch[1];

                // also clear list entries (make generic)
                // const listRegex = /.*\/rest\/(\w*)\.json.*/gi;
                const keys = [...Object.keys(this.cachedResponses)];
                for (let entryKey of keys) {
                  if (
                    entryKey.toLowerCase().startsWith(`/api/rest/${objectType}`)
                  ) {
                    console.log(`[cache]: clearing cache for ${entryKey}`);
                    this.removeCachedEntry(entryKey);
                  }
                }
              }

              this.subject.next({
                type: 'cached-entry',
                payload: {
                  url: req.url,
                },
              });
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
    return Object.keys(this.cachedResponses).map(x => ({ url: x }));
  }

  removeCachedEntry(key: string): any {
    this.cachedResponses[key] = null;
    delete this.cachedResponses[key];
    return { msg: 'Done' };
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
