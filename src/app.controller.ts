import { Get, Controller, Post, Query, Req } from '@nestjs/common';
import { AppService } from './app.service';

@Controller('api/options')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get(':objectType.json')
  lookups(@Req() req: Request): string {
    console.log(req);
    return this.appService.root();
  }

  @Post()
  setVal(@Query('val') val: number) {
    this.appService.setValue(val);
  }
}
