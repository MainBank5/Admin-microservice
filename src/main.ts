import { NestFactory } from '@nestjs/core';
import { ValidationPipe, VersioningType } from '@nestjs/common';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
    }),
  );
  //app.setGlobalPrefix('api')
  app.enableCors();
  // app.enableVersioning({
  //   type: VersioningType.URI,
  //   defaultVersion: 'v1'
  // });
  //swagger configuration
  const config = await new DocumentBuilder()
    .setTitle('Product-Admin')
    .setDescription('Product Admin API microservice')
    .setVersion('v1')
    .addTag('Product Admin')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/docs', app, document);
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
