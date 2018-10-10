import {
  Controller,
  Delete,
  Get,
  Post,
  Put,
  Req,
  Param,
  Query,
} from '@nestjs/common';
import { CacheService } from './cache.service';

@Controller('api')
export class AppController {
  constructor(private readonly cacheService: CacheService) {}

  @Get('cache/clear')
  clearCache() {
    // should be POST, but easier to call in browser
    // like this
    this.cacheService.clearCache();
    return { msg: 'done, my master' };
  }

  @Get('cache/entries')
  cacheEntries() {
    return this.cacheService.cachedEntries();
  }

  @Delete('cache/entry')
  removeEntry(@Query('key') key: string) {
    return this.cacheService.removeCachedEntry(key);
  }

  // TODO should be able to intercept any kind of request somehow 🤔
  @Get('**')
  gets(@Req() req) {
    return this.cacheService.sendRequest(req);
  }

  @Post('**')
  posts(@Req() req) {
    return this.cacheService.sendRequest(req);
  }

  @Put('**')
  put(@Req() req) {
    return this.cacheService.sendRequest(req);
  }

  @Delete('**')
  delete(@Req() req) {
    return this.cacheService.sendRequest(req);
  }
}
