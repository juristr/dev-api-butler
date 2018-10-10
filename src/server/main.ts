import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { json } from 'body-parser';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    // bodyParser: false,
  });
  app.use(json({ limit: '50mb' }));
  await app.listen(3000);
}
bootstrap();
