import { Module, HttpModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { CacheService } from './cache.service';
import { CacheController } from 'cache.controller';

@Module({
  imports: [HttpModule],
  controllers: [AppController, CacheController],
  providers: [CacheService],
})
export class AppModule {}
