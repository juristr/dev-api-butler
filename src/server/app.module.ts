import { Module, HttpModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { CacheService } from './cache.service';
import { CacheController } from './cache.controller';
import { EventsGateway } from 'events.gateway';

@Module({
  imports: [HttpModule],
  controllers: [AppController, CacheController],
  providers: [CacheService, EventsGateway],
})
export class AppModule {}
