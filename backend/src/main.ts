import { Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { useContainer } from 'class-validator';
import { AppModule } from './app.module';
import { PUBLIC_DIR } from './constants';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  const config = app.get(ConfigService);

  useContainer(app.select(AppModule), { fallbackOnErrors: true });

  app.useStaticAssets(PUBLIC_DIR, {
    index: false,
    prefix: '/public/',
  });
  // set cors
  app.enableCors();

  const PORT = config.get('app.port');
  const URL = config.get('app.url');
  await app.listen(PORT, () => {
    Logger.log('Listening at ' + URL, 'Bootstrap');
  });
}
bootstrap();
