import { NestFactory } from '@nestjs/core';
import { ValidationPipe, VersioningType } from '@nestjs/common';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true,
    transform: true,
  }));
  app.setGlobalPrefix('api')
  app.enableCors();
  app.enableVersioning({
    type: VersioningType.URI,
    defaultVersion: 'v1'
  })
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
