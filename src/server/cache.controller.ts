import { Controller, Get } from '@nestjs/common';
import { CacheService } from './cache.service';

@Controller('cache')
export class CacheController {
  constructor(private readonly cacheService: CacheService) {}

  @Get('clear')
  clearCache() {
    // should be POST, but easier to call in browser
    // like this
    this.cacheService.clearCache();
    return { msg: 'done, my master' };
  }

  @Get('entries')
  cacheEntries() {
    return this.cacheService.cachedEntries();
  }
}
