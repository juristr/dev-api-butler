import { Controller, Delete, Get, Post, Put, Req } from '@nestjs/common';
import { CacheService } from './cache.service';

@Controller('api')
export class AppController {
  constructor(private readonly cacheService: CacheService) {}

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
