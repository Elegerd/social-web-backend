import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { useContainer } from 'class-validator';

import { AppModule } from './app.module';
import {
  IS_DEVELOPMENT,
  FRONTEND_BASE_URL,
  API_PORT,
  GLOBAL_PREFIX,
} from './constants';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  useContainer(app.select(AppModule), { fallbackOnErrors: true });
  app.enableCors(IS_DEVELOPMENT ? undefined : { origin: FRONTEND_BASE_URL });

  const config = new DocumentBuilder()
    .setTitle('Social Web')
    .setDescription('The "Social Web" API description')
    .setVersion('1.0')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  app.setGlobalPrefix(GLOBAL_PREFIX);

  await app.listen(API_PORT);
}
bootstrap();
